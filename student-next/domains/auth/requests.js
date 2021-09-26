import { requesterStudent} from "../../network/requester";

const signupStudent = async (values) => 
    (await requesterStudent.post('/web/auth/signup?entity=student', { ...values, type: 'student' })).data;

const resendStudentPin = async (email, token) => 
        (await requesterStudent.post(`/web/auth/resend-signup-pin`, { token, email })).data;

const validateStudentSignupPin = async (pin, token) => 
        (await requesterStudent.post(`/web/auth/validate-singup-pin`, { token, pin })).data;



export {
    signupStudent,
    resendStudentPin,
    validateStudentSignupPin
}