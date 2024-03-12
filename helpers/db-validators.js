const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Categoria = require('../models/categoria');
const Curso = require('../models/curso');

//Validar email
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra en la base de datos`)
    }
}


//Validar Rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}


//Validar si el usuario con el id pasado existe
const usuarioExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningún usuario registrado`);
    }
}

//Validar si la categoría del curso existe
const categoriaExiste = async (id) => {
    const existeCategoria = await Categoria.findById(id)

    if(!existeCategoria){
        throw new Error(`El id ${id} no corresponde a ninguna categoría registrada`)
    }
}

//Validar que el curso existe
const cursoExiste = async (id) => {
    const existeCurso = await Curso.findById(id);

    if(!existeCurso){
        throw new Error(`El id ${id} no corresponde a ningúncurso registrado`)
    }
}

module.exports = {
    emailExiste,
    esRolValido,
    usuarioExiste,
    categoriaExiste,
    cursoExiste
}