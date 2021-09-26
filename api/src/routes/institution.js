import express from 'express';
import Signup from '../mutations/institution/auth/signUp';





const router = express.Router();


const institutionRouter = () => {
    router.route('/web/auth/signup').post(Signup);
    return router;
}


export default institutionRouter;