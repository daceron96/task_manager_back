import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

describe('Database Connection Test', () => {
  beforeAll(async () => {
    try {
      mongoServer = await MongoMemoryServer.create();

      const mongoUri = mongoServer.getUri();

      await mongoose.connect(mongoUri);
      console.log('✅ Conectado exitosamente a la base de datos de prueba');
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await mongoose.disconnect();
      await mongoServer.stop();
      console.log('✅ Conexiones cerradas exitosamente');
    } catch (error) {
      console.error('❌ Error al cerrar las conexiones:', error);
      throw error;
    }
  });

  test('should connect successfully to the MongoDB memory server', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});