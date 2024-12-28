import connectDB from '../infrastructure/database/index.js';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try {
        await connectDB();
        console.log('Prueba de conexión exitosa');
    } catch (error) {
        console.error('Error en la prueba de conexión:', error);
    } finally {
        process.exit();
    }
};

testConnection();