import axios from "axios";

const requesterStudent = axios.create({ baseURL: 'http://localhost:3001/api/v1/student' });
const requesterInstitution = axios.create({ baseURL: 'http://localhost:3001/api/v1/institution' });
const requesterCommon = axios.create({ baseURL: 'http://localhost:3001/api/v1/common' });


export {
    requesterInstitution,
    requesterStudent,
    requesterCommon,
};