export default (token) => {
    try {
        decoded = jwt.verify(token, process.env['AUTH_JWT_SIGNATURE']);
        return {
            decoded,
            valid: true
        };
    } catch (err) {
        let errMessage;
        if(err.name === 'TokenExpiredError') {
            errMessage = 'This token has expired. You must login again.';
        } else {
            errMessage = 'This token is invalid. You must login again.';
        }
        return {
            valid: false,
            error: errMessage
        };;
    }
}