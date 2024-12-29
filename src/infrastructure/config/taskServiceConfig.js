import { TaskRepository } from "../../domain/tasks/repositories/TaskRepository.js";
import { TaskController } from '../http/controllers/TaskController.js';
import { CreateTask } from "../../application/services/tasks/createTask.js";
import { GetTaskList } from "../../application/services/tasks/getTasksList.js";
import { GetTask} from "../../application/services/tasks/getTask.js";
import { DeleteTask } from "../../application/services/tasks/deleteTask.js";
import { UpdateTask } from "../../application/services/tasks/updateTask.js";

export const taskServiceConfig = () => {
  const taskRepository = new TaskRepository();
  const createTaskUseCase = new CreateTask(taskRepository);
  const getTaskListUseCase = new GetTaskList(taskRepository);
  const getTaskUseCase = new GetTask(taskRepository);
  const deleteTaskUseCase = new DeleteTask(taskRepository);
  const updatedTaskUseCase = new UpdateTask(taskRepository);
  const taskController = new TaskController(
    createTaskUseCase, 
    getTaskListUseCase,
    getTaskUseCase,
    deleteTaskUseCase,
    updatedTaskUseCase
  );

  return taskController
}