import { validationResult } from 'express-validator';
import { logger } from '../../logging/logger.js';
import createError from 'http-errors';


export class TaskController {
  constructor(createTaskUseCase,getTaskListUseCase, getTaskUseCase, deleteTaskUseCase, updateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase
    this.getTaskListUseCase = getTaskListUseCase
    this.getTaskUseCase = getTaskUseCase
    this.deleteTaskUseCase = deleteTaskUseCase
    this.updateTaskUseCase = updateTaskUseCase
  }

  createTask = async (req, res, next) => {

    try{
      const taskData = req.body;
      const response = await this.createTaskUseCase.execute(taskData);
      return res.status(201).json({status:true, data:response});
      
    }catch(error){
      return res.status(400).json({status:false, error:error.message})
    }
  }

  getTaskList = async (req, res, next) => {

    try {
      const filter = req.query;

      const tasks = await this.getTaskListUseCase.execute(filter);

      return res.status(200).json(tasks)

    } catch (error) {
      return res.status(500).json({ status:false, message: 'Error al obtener las tareas', error: error.message });
    }
  }

  getTask = async (req, res, next) => {

    try {
      const { id } = req.params;

      const task = await this.getTaskUseCase.execute(id);

      return res.status(200).json({
        success: true,
        data: task
      })

    } catch (error) {
      if (error.message === 'Tarea no encontrada') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      return res.status(500).json({ status:false, message: 'Error al obtener las tareas', error: error.message });
    }
  }

  deleteTask = async (req, res, next) => {
    try{
      const { id } = req.params;

      const response = await this.deleteTaskUseCase.execute(id);

      return res.status(200).json({
        success: true,
        data: response
      });
    }catch(error){
      return res.status(500).json({ status:false, message: 'Error al eliminar la tarea', error: error.message });
    }
  }

  updateTask = async (req, res, next) => {
    try{
      const { id } = req.params;
      const taskData = req.body;

      const updatedTask = await this.updateTaskUseCase.execute(id, taskData);

      return res.status(200).json({
        success: true,
        data: updatedTask
      });

    }catch(error){
      throw error
    }
  }
}