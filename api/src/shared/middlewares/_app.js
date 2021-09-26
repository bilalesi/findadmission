import requestIp from 'request-ip';

const requestRegisterer = function (req, res, next) {
    const clientIp = requestIp.getClientIp(req); 
    console.log('requestRegisterer --> ', clientIp)
    next();
}


export default requestRegisterer;