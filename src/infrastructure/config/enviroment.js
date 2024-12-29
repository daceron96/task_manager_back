import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    enviroment: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || '/api'
  },
  database: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/task_manager'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localgost:3000'
  }
};

const validateConfig = () => {
  const requiredEnvs = [
    'MONGODB_URI'
  ];

  for (const env of requiredEnvs) {
    if (!process.env[env]) {
      throw new Error(`La variable de entorno ${env} es requerida`);
    }
  }
};

export {
  config,
  validateConfig
};