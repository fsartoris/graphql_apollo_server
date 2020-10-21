const { gql } = require("apollo-server");

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }

  type TipoReclamo {
    id: ID
    descripcion: String
    usuario: ID
    creado: String
  }

  type Reclamo {
    id: ID
    detalle: String
    tipo: TipoReclamo
    creado: String
    usuario: ID
    estado: EstadoReclamo
  }

  enum EstadoReclamo {
    PENDIENTE
    RESUELTO
    CANCELADO
  }

  type Token {
    token: String
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }

  input TipoReclamoInput {
    descripcion: String!
  }

  input ReclamoInput {
    detalle: String!
    tipo: ID
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  type Query {
    getUsuario: Usuario
    getTipoReclamos: [TipoReclamo]
    getTipoReclamo(id: ID!): TipoReclamo
    getReclamos: [Reclamo]
    getReclamo(id: ID!): Reclamo
    getReclamosUsuario: [Reclamo]
  }

  type Mutation {
    # Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    nuevoTipoReclamo(input: TipoReclamoInput): TipoReclamo
    eliminarTipoReclamo(id: ID!): String
    actualizarTipoReclamo(id: ID!, input: TipoReclamoInput): TipoReclamo

    # Reclamos
    # nuevoReclamo(input: ReclamoInput) : Reclamo
    # actualizarReclamo(id: ID!, input: ReclamoInput ) : Reclamo
    # eliminarReclamo(id: ID!) : String

    nuevoReclamo(input: ReclamoInput): Reclamo
    actualizarReclamo(id: ID!, input: ReclamoInput): Reclamo
    eliminarReclamo(id: ID!): String
  }
`;

module.exports = typeDefs;
