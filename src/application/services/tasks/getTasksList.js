
export class GetTaskList {

  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(filter={}){
    try{
      
      const {completed} = filter

      if (completed !== undefined) {
        if (completed !== 'true' && completed !== 'false') {
          throw new Error('El valor de completado debe ser true o false')
        }
      }

      const allowedFilters = ['completed'];

      for(const key in filter){
        if(!allowedFilters.includes(key)){
          delete filter[key];
        }
      }

      const tasks = await this.taskRepository.getTaskList(filter);
      return tasks

    }catch(error){
      throw error
    }
  }

}