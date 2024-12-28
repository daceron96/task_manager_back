import mongoose from 'mongoose';
import { config } from '../config/index.js';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        
        const connection = await mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB: Conexión establecida');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB: Error de conexión', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(' MongoDB: Conexión perdida');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB: Conexión cerrada por finalización de la aplicación');
            process.exit(0);
        });

        console.log(`MongoDB conectado: ${connection.connection.host}`);
        console.log(`Base de datos: ${connection.connection.name}`);

        return connection;
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;