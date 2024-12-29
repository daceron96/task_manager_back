import {Router} from 'express';
import { createTaskValidator } from '../validators/taskValidator.js';
import { taskServiceConfig } from '../../config/taskServiceConfig.js';



export const createTaskRouter = () => {
  
  const router = Router();
  const taskController = taskServiceConfig();

  router.post('/tasks', createTaskValidator, taskController.createTask);
  router.get('/tasks', taskController.getTaskList);
  router.get('/tasks/:id', taskController.getTask);
  router.delete('/tasks/:id', taskController.deleteTask);
  // router.put('/tasks/:id', taskController.updateTask);

  return router;

}