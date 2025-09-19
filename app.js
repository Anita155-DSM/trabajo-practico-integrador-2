import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import connectDB from './src/config/database.js';


const app = express();
const PORT = process.env.PORT || 3000;

// como siempre, devuelve en json
app.use(express.json());

//levanto primero el servidor de la siguiente manera:
app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

