import express from 'express';
import Signup from '../mutations/student/auth/signUp';
import Signin from '../mutations/student/auth/signIn';





const router = express.Router();


const studentRoute = () => {
    router.route('/web/auth/signup').post(Signup);
    router.route('/web/auth/signin').post(Signin);
    return router;
}


export default studentRoute;