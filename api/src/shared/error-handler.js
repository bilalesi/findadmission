const debug = require('debug')('api:error-handler');
import httpStatus from 'http-status-codes';

const createServerError = (res, error, message, location) => {
    console.error(`Server Error 500: ${location} -- `, error);
    debug(` ⛔️ Server Error 500: ${location} -- `, error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        done: false,
        code: 'ServerError',
        message: message,
    })
}



export default createServerError;