export class Task {

  constructor({title,description,completed}){

    if(!title){
      throw new Error('El título es obligatorio');
    }

    this.title = title;
    this.description = description || '';
    this.completed = completed || false;
  }

}