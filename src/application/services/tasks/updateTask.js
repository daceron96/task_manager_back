
export class UpdateTask{
  
  constructor(taskRepository){  
    this.taskRepository = taskRepository
  }

  async execute(id, taskData){
    try{
      
      if(!id){
        throw new Error('El id es obligatorio');
      }
      
      const task = await this.taskRepository.getTaskById(id);

      if (!task) {
        throw new Error('Tarea no encontrada');
      }

      const updatedTask = await this.taskRepository.updateTask(id, taskData);

      return updatedTask;
    }catch(error){
      throw error
    }
  }
}