import { requesterStudent, requesterInstitution, requesterCommon } from "../../network/requester";

const signupStudent = async (values) =>
    (await requesterStudent.post('/web/auth/signup?entity=student', { ...values, type: 'student' })).data;

const resendPin = async (email, token, type) =>
        (await requesterCommon.post(`/identity/resend-signup-pin`, { token, email, type })).data;

const validatePin = async (pin, token, type) =>
        (await requesterCommon.post(`/identity/validate-singup-pin`, { token, pin, type })).data;

const signupParentStudent = async (values) =>
    (await requesterStudent.post('/web/auth/signup?entity=parent', { ...values, type: 'parent' })).data;

const signupInstitution = async (values) =>
    (await requesterInstitution.post('/web/auth/signup?entity=institution', { ...values })).data;

const signinOrchestrator = async (values) =>
    (await requesterCommon.post('/identity/signin', values)).data;

export {
    signupStudent,
    resendPin,
    validatePin,
    signupParentStudent,
    signupInstitution,
    signinOrchestrator
}