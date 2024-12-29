import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import { logger } from './infrastructure/logging/logger.js';
import { createTaskRouter } from './infrastructure/http/routes/taskRoutes.js';
import connectDB from './infrastructure/database/mongo.js'


const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info('Petición recibida', {
    method: req.method,
    path: req.path
  });
  next();
});

app.use('/api', createTaskRouter());

app.use((req, res, next) => {
  next(createError(404, 'Ruta no encontrada'));
});

app.use((err, req, res, next) => {
  logger.error('Error en la aplicación', {
    error: err.message,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor'
  });
});

export default app;