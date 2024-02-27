const { response, request } = require('express');
const Usuario = require('../models/usuario');
let  bcrypt = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
  const datos = req.query;
  const query = {estado: true}; 

  const [total, usuarios] = await Promise.all([Usuario.countDocuments(query), Usuario.find(query)]);

  res.json({
    mensaje: "Usuarios obtenidos",
    total,
    usuarios
  })
}

const usuarioPost = async (req = request, res = response) => {
  //Recibir el cuerpo de la petición
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  usuario.password = hash;

  //Guardar los datos en BD
  await usuario.save();

  res.json({
    usuario,
    mensaje: "Usuario creado correctamente",
  })
}

const usuarioPut = async (req = request, res = response) => {
  const { id } = req.params;

  //Obtener datos para actualizar
  const { password, correo, ...resto } = req.body;

  //Si actualiza el password, debo cifrarlo o encriptarlo
  if(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    resto.password = hash;
  }

  resto.correo = correo;

  //buscar el usuario y actualizarlo
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    mensaje: "Usuario actualizado",
    usuario
  })
}

const usuarioDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //Para eliminar el registro
  /*  const usuarioBorrado = await Usuario.findByIdAndDelete(id); */

  //Para cambiar el estado a false
  const usuario = await Usuario.findById(id);

  if (!usuario.estado) {
    return res.json({
      mensaje: "El usuario no existe"
    })
  }

  const usuarioInactivado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json({
    mensaje: "Usuario borrado",
    //usuarioBorrado
    usuarioInactivado
  })
}

module.exports = {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete
}