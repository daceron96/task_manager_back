import Task from '../models/task.model.js';
import { logger } from '../../../infrastructure/logging/logger.js';
import createError from 'http-errors';
import mongoose from 'mongoose';

export class TaskRepository {
  constructor() {
    this.model = Task;
  }

  async create(taskData){

    try {
      
      logger.debug('Iniciando creación de tarea taskRepository', { taskTitle: taskData.title });

      const task = new this.model(taskData);

      const savedTask = await task.save();

      logger.debug('Tarea creada exitosamente', {
        taskId: savedTask._id,
        taskTitle: savedTask.title
      });

      return savedTask

    } catch (error) {
      logger.error('Error al crear tarea en base de datos', {
        error: error.message,
        stack: error.stack,
        taskData: taskData
      });

      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors)
          .map(err => err.message)
          .join(', ');

        throw createError(400, `Error de validación: ${validationErrors}`);
      }

      if (error.name === 'MongoError' && error.code === 11000) {
        throw createError(409, 'La tarea ya existe');
      }
      throw createError(500, 'Error al guardar la tarea en la base de datos');
    }
  }

  async getTaskList(filter={}){
    try {
      const tasks = await this.model.find(filter);
      return tasks;
    } catch (error) {
      throw new Error(500, `Error al obtener las tareas ${error.message}`);
    }
  }

  async getTaskById(id){
    try {
      const task = await this.model.findById(id)
      return task
    } catch (error) {
      throw error
    }
  }

  async deleteById(id){
    try {
      const task = await this.model.findById(id);
      if (!task) {
        throw new Error(404, 'Tarea no encontrada');
      }

      await this.model.deleteOne({ _id: id });

      return  'Tarea eliminada'
    } catch (error) {
      throw new Error(500, `Error al eliminar la tarea ${error.message}`);
    }
  }

  async updateTask(id, taskData) {
    try {
      const task = await this.model.findById(id);
      if (!task) {
        throw new Error('Tarea no encontrada');
      }
  
      Object.assign(task, taskData);
  
      const updatedTask = await task.save();
  
      return updatedTask; 
    } catch (error) {
      console.log(error)
      throw new Error('Error al actualizar tarea: ' + error.message);
    }
  }

  validateId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('ID de tarea inválido', { taskId: id });
      throw createError(400, 'ID de tarea inválido');
    }
  }
}