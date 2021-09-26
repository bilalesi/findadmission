const debug = require('debug')('api:reply-handler');

const createServerReply = (res, status, code = "api reply code", message = "api reply message", data = {}, location = "api") => {
    console.info(`Reply Data ${status} -- ${location}`);
    debug(` ✅  Reply Data:`, data.debug ? JSON.stringify(data, null, 2) : null);
    return res.status(status).json({
        "done": true,
        "code": code,
        "message": message,
        "reply": data
    });
}

const createServerReplyError = (res, status, code, message, data, location, error = null) => {
    console.warn(`Reply Data Error ${status} -- ${location}`, error);
    debug(` ⚠️  Reply Data Error:`, JSON.stringify(error, null, 2));
    return res.status(status).json({
        "done": false,
        "code": code,
        "message": message,
        "error": data,
        location: location
    })
}
export { createServerReplyError, createServerReply }