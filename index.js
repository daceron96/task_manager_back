// index.js
import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});