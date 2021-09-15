import StudentRepository from "../repository/student";
import jwt from "jsonwebtoken";

export const isAuthedResolver = (resolver) => async (req, res, next) => {
    let token = req.headers.Authorization;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env['AUTH_JWT_SIGNATURE']);
    } catch (err) {
        let errMessage;
        if(err.name === 'TokenExpiredError') {
            errMessage = 'This token has expired. You must login again.';
        } else {
            errMessage = 'This token is invalid. You must login again.';
        }
        return errMessage;
    }
    if(!decoded.sub)
    if (!user || user.bannedAt || user.deletedAt) {
        return "You must be signed in to do this";
    }
    return resolver(req, res, next);
  }