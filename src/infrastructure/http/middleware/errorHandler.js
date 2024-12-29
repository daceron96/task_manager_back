import createError from 'http-errors';
import { logger } from '../../logging/logger';

export const errorHandler = (err, req, res, next) => {
    logger.error({
        err,
        req: {
            method: req.method,
            url: req.url,
            params: req.params,
            body: req.body
        }
    }, 'Error en la petición');

    if (!createError.isHttpError(err)) {
        err = createError(500, err.message || 'Error interno del servidor');
    }

    const response = {
        error: {
            status: err.status,
            message: err.message
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        response.error.stack = err.stack;
    }

    res.status(err.status).json(response);
};