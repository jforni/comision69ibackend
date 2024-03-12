const { request, response } = require('express');
const Categoria = require('../models/categoria');


const categoriasGet = async (req = request, res = response) => {
    //Obtener todas las categorias paginadas con el total
    const {desde=0, limite=10} = req.query;
    const query = {estado: true}; 
  
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query), 
        Categoria.find(query).skip(desde).limit(limite).populate('usuario', 'correo')
    ]);
  
    res.json({
      mensaje: "Categorías obtenidas",
      total,
      categorias
    })
  }

const categoriaGet = async (req=request, res=response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre correo');

    res.json({
        categoria
    })
};

const categoriaPost = async(req=request, res=response) => {
    const nombre = req.body.nombre.toUpperCase();

    //verificamos si la categoria existe
    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data que vamos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria,
        msg: `Categoría ${categoria.nombre} creada con éxito`
    })
}

const categoriaPut = async (req=request, resp=response) => {
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id;

    const data = {
        nombre,
        usuario
    }

    const categoria = await Categoria.finByIdAndUpdate(id, data, {new:true});

    res.status(201).json({
        msg: 'Categoría actualizada exitosamente',
        categoria
    })
}

const categoriaDelete = async (req=request, resp=response) => { 
    const {id} = req.params;

    const categoriaInactiva = await Categoria.finByIdAndUpdate(id, {estado: false}, {new:true});

    res.json({
        msg: 'La categoría fue eliminada exitosamente - inactivada',
        categoriaInactiva
    })
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}