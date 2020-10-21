const mongoose = require("mongoose");

const ReclamoSchema = mongoose.Schema({
  detalle: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TipoReclamo",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  estado: {
    type: String,
    default: "PENDIENTE",
  },
});

module.exports = mongoose.model("Reclamo", ReclamoSchema);
