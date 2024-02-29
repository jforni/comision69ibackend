const Usuario = require('../models/usuario');

//Validar email
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra en la base de datos`)
    }
}


//Validar Rol


//Validar si el usuario con el id pasado existe
const usuarioExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningún usuario registrado`);
    }
}


module.exports = {
    emailExiste,
    usuarioExiste,
}