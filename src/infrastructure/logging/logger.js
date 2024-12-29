import pino from "pino";
import expressPino from "express-pino-logger";

const logger = pino({

  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

  transport:{
    target: 'pino-pretty',
    options:{
      colorize: true,
      translateTime: true,
      ignore: 'pid,hostname'
    }
  },
  serializers: {
    err: pino.stdSerializers.err
  }
})

const expressLogger = expressPino({ logger });

export { logger, expressLogger };