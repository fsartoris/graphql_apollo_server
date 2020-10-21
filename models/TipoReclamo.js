const mongoose = require("mongoose");

const TipoReclamoSchema = mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TipoReclamo", TipoReclamoSchema);
