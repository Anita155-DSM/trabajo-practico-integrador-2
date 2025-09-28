//importaciones
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;
//middlewares 
app.use(express.json());
//cors
app.use(cors()); 
//cookies
app.use(cookieParser());
//rutas
app.use('/api', routes);

//levanto primero el servidor de la siguiente manera:
app.listen(PORT, async() => {
    await connectDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

