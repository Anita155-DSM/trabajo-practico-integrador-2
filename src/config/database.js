//material de mongoose
/*import mongoose from 'mongoose';
// Conexión básica
mongoose.connect('mongodb://localhost:27017/mi_base_datos')
.then(() => console.log('Conectado a MongoDB exitosamente'))
.catch(err => console.error('Error de conexión:', err)); */

import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a la base de datos correctamente");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error);
    }
};
export default connectDB;