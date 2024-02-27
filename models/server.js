const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar con base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Funciones para las rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Leer lo que envía el usuario por el cuerpo de la petición
        this.app.use(express.json());

        //Definir carpeta pública 
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server online port: ', this.port);
        })
    }
}

module.exports = Server;