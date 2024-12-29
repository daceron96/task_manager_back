import { Task } from "../../../domain/tasks/entities/task.entity.js"

export class CreateTask{
  constructor(taskRepository){
    this.taskRepository = taskRepository
  }

  async execute(taskData){
    try {
      const task = new Task(taskData)
      const createdTask = await this.taskRepository.create(task)

      return createdTask

    } catch (error) {
      throw error
    }
  }
}