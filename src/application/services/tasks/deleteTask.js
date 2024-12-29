
export class DeleteTask{

  constructor(taskRepository){  
    this.taskRepository = taskRepository
  }

  async execute(id){
    try{
      
      if(!id){
        throw new Error('El id es obligatorio');
      }
      
      const response = await this.taskRepository.deleteById(id);
      return response;
    }catch(error){
      throw error
    }
  }

}