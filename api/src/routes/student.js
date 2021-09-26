import express from 'express';
import Signup from '../mutations/student/auth/signUp';
import Signin from '../mutations/student/auth/signIn';
import resendAuthPinSignUp from '../mutations/student/auth/resendAuthPinSignUp';
import validateAuthPinSignupRedirect from '../mutations/student/auth/validateAuthPinSignupRedirect';





const router = express.Router();


const studentRoute = () => {
    router.route('/web/auth/signup').post(Signup);
    router.route('/web/auth/signin').post(Signin);
    router.route('/web/auth/resend-signup-pin').post(resendAuthPinSignUp);
    router.route('/web/auth/validate-singup-pin').post(validateAuthPinSignupRedirect);
    return router;
}


export default studentRoute;