const { Schema, model }= require('mongoose');

const CursoSchema = Schema({
    nombre: { type: String, required:[true, 'El nombre es obligatorio'], unique: true},
    estado: { type: Boolean, required: true, default: true},
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true},
    precio: { type: Number, default: 0},
    categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true},
    descripcion: { type: String},
    img: { type: String},
    destacado: { type: Boolean, default: false},
});

module.exports = model('Curso', CursoSchema);