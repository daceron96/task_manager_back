export class GetTask {

  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id){

    try{
      
      const task = await this.taskRepository.getTaskById(id);

      if (!task) {
        throw new Error('Tarea no encontrada');
      }

      return task;

    }catch(error){
      throw error
    }

  }

}