import mongoose from 'mongoose';

class TaskClass {
  async markAsCompleted() {
    this.completed = true;
    return await this.save();
  }

  async markAsPending() {
    this.completed = false;
    return await this.save();
  }

  static async findByStatus(completed) {
    return await this.find({ completed });
  }
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [2, 'El título debe tener al menos 2 caracteres'],
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },

  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },

  completed: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

taskSchema.loadClass(TaskClass);

taskSchema.pre('save', async (next) => {
  next();
});

const Task = mongoose.model('Task', taskSchema);
export default Task;