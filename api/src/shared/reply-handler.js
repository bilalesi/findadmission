const debug = require('debug')('api:reply-handler');

const createServerReply = (res, status, code, message, data, location) => {
    console.info(`Reply Data ${status} -- ${location}`);
    debug(` ✅  Reply Data:`, JSON.stringify(data, null, 2));
    return res.status(status).json({
        "done": true,
        "code": code,
        "message": message,
        "reply": data
    })
}

const createServerReplyError = (res, status, code, message, data, location) => {
    console.warn(`Reply Data Error ${status} -- ${location}`);
    debug(` ⚠️  Reply Data Error:`, JSON.stringify(data, null, 2));
    return res.status(status).json({
        "done": false,
        "code": code,
        "message": message,
        "error": data
    })
}
export { createServerReplyError, createServerReply }