const Usuario = require("../models/Usuario");
const bctyptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Reclamo = require("../models/Reclamo");
const TipoReclamo = require("../models/TipoReclamo");

require("dotenv").config({ path: "variable.env" });

const createToken = (user, secret, expiresIn) => {
  const { id, nombre, apellido } = user;
  return jwt.sign({ id, nombre, apellido }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getUsuario: async (_, {}, context) => {
      return context.usuario;
      //const userId = await jwt.verify(token, process.env.JWT_SECRET);
      //return userId;
    },

    getTipoReclamos: async (_, {}) => {
      try {
        const tipoReclamos = await TipoReclamo.find({});
        return tipoReclamos;
      } catch (error) {
        console.log(error);
      }
    },

    getTipoReclamo: async (_, { id }) => {
      const tipo = await TipoReclamo.findById(id);

      if (!tipo) {
        throw new Error("Tipo de Reclamo no existe");
      }

      return tipo;
    },

    getReclamos: async () => {
      try {
        const reclamos = await Reclamo.find({});
        return reclamos;
      } catch (error) {
        console.log(error);
      }
    },

    getReclamo: async (_, { id }, context) => {
      const reclamo = await Reclamo.findById(id);

      if (!reclamo) {
        throw new Error("Reclamo no existe");
      }

      if (reclamo.usuario.toString() !== context.usuario.id) {
        throw new Error("Reclamo sin permisos");
      }

      return reclamo;
    },

    getReclamosUsuario: async (_, {}, context) => {
      try {
        const reclamos = await Reclamo.find({
          usuario: context.usuario.id.toString(),
        }).populate("tipo");
        return reclamos;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;
      const existeUser = await Usuario.findOne({ email });

      if (existeUser) {
        throw new Error("Usuario registrado");
      }

      const salt = await bctyptjs.genSalt(10);
      input.password = await bctyptjs.hash(password, salt);

      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.log("error => ", error);
      }
    },

    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      const user = await Usuario.findOne({ email });

      if (!user) {
        throw new Error("El usuario no existe");
      }

      const passwordOK = await bctyptjs.compare(password, user.password);

      if (!passwordOK) {
        throw new Error("Password incorrecto");
      }

      return {
        token: createToken(user, process.env.JWT_SECRET, "24h"),
      };
    },

    nuevoTipoReclamo: async (_, { input }, context) => {
      const { descripcion } = input;

      const existe = await TipoReclamo.find({
        descripcion: { $regex: descripcion, $options: "i" },
      }).limit(1);

      if (existe.length > 0) {
        throw new Error("Tipo de Reclamo ya existe");
      }

      try {
        const tipoReclamo = new TipoReclamo(input);
        tipoReclamo.usuario = context.usuario.id;

        return await tipoReclamo.save();
      } catch (error) {
        console.log(error);
      }
    },

    actualizarTipoReclamo: async (_, { id, input }, context) => {
      let tipo = await TipoReclamo.findById(id);

      if (!tipo) {
        throw new Error("Tipo Reclamo no existe");
      }

      tipo.usuario = context.usuario.id;

      return await TipoReclamo.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
    },

    nuevoReclamo: async (_, { input }, context) => {
      try {
        const { tipo } = input;

        let tipoObject = await TipoReclamo.findById(tipo);

        if (!tipoObject) {
          throw new Error("El tipo no existe");
        }

        const reclamo = new Reclamo(input);

        reclamo.tipo = tipoObject;
        reclamo.usuario = context.usuario.id;

        return await reclamo.save();
      } catch (error) {
        console.log(error);
      }
    },

    actualizarReclamo: async (_, { id, input }, context) => {
      let reclamo = await Reclamo.findById(id);

      if (!reclamo) {
        throw new Error("Reclamo no existe");
      }

      if (reclamo.usuario.toString() !== context.usuario.id) {
        throw new Error("Reclamo sin permisos");
      }

      return await Reclamo.findOneAndUpdate({ _id: id }, input, { new: true });
    },

    eliminarReclamo: async (_, { id }, context) => {
      const reclamo = await Reclamo.findById(id);

      if (!reclamo) {
        throw new Error("Reclamo no existe");
      }

      if (reclamo.usuario.toString() !== context.usuario.id) {
        throw new Error("Reclamo sin permisos");
      }

      await Reclamo.findOneAndDelete({ _id: id });
      return id;
    },

    eliminarTipoReclamo: async (_, { id }, context) => {
      const tipoReclamo = await TipoReclamo.findById(id);

      if (!tipoReclamo) {
        throw new Error("Tipo de Reclamo no existe");
      }

      await TipoReclamo.findOneAndDelete({ _id: id });
      return id;
    },
  },
};

module.exports = resolvers;
