const jwt = require('jsonwebtoken');


export default (token, key) => {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env[key]);
        return {
            decoded,
            valid: true
        };
    } catch (err) {
        let errMessage;
        if(err.name === 'TokenExpiredError') {
            errMessage = 'This token has expired';
        } else {
            errMessage = 'This token is invalid';
        }
        return {
            valid: false,
            error: errMessage,
            decoded
        };;
    }
}