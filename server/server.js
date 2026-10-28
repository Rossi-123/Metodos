import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';

export default class Server {
    constructor() {
       this.app = express();
       this.port = process.env.PORT || 3000;
       this.generalRoutes = '/api/';
       //Middleware
       this.middleware();
       //Rutas
       this.routes();
    }

    middleware() {
        //cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    } 
    routes() {
        //localhost:3000/api/ejemplo
        this.app.use(this.generalRoutes, indexRoutes);
        // 404 - Ruta no encontrada
        this.app.use((req, res) => {
            res.status(404).send('Página no encontrada');
        });
    }  
    async listen() {
        await db.conectarMongoDB();
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + String(this.port).yellow);
        });
    } 
}       
