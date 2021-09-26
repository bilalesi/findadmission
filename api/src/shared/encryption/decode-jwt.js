const jwt = require('jsonwebtoken');


export default (token, key) => {
    let decoded;
    try {
        decoded = jwt.decode(token);
        return {
            isDecoded: true,
            decoded
        };
    } catch (error) {
        return {
            isDecoded: false,
            error
        }
    }
}