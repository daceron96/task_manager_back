import {TaskService} from '../../../domain/services/TaskService';
import { logger } from '../../../infrastructure/logging/logger';

jest.mock('../../../infrastructure/logging/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

describe('TaskService', () => {
  let taskService;
  let mockTaskRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mockTaskRepository = {
      create: jest.fn()
    };

    taskService = new TaskService(mockTaskRepository);
  });

  describe('createTask', () => {

    it('debería crear una tarea cuando los datos son válidos', async () => {
      const taskData = {
        title: 'Hacer compras',
        description: 'Comprar pan y leche'
      };
      
      const createdTask = {
        _id: '123',
        ...taskData,
        completed: false,
        createdAt: new Date()
      };

      mockTaskRepository.create.mockResolvedValue(createdTask);

      const result = await taskService.createTask(taskData);

      expect(result).toEqual(createdTask);
      
      expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData);
      
      expect(logger.info).toHaveBeenCalledWith(
        'Iniciando creación de tarea',
        expect.any(Object)
      );

      expect(logger.info).toHaveBeenCalledWith(
        'Tarea creada exitosamente',
        expect.any(Object)
      );
    });
    it('debería lanzar un error cuando no se proporciona título', async () => {
      const invalidTaskData = {
        description: 'Solo descripción'
      };

      await expect(async () => {
        await taskService.createTask(invalidTaskData);
      }).rejects.toThrow('El título es obligatorio');

      expect(logger.error).toHaveBeenCalled();
      
      expect(mockTaskRepository.create).not.toHaveBeenCalled();
    });
  });
});