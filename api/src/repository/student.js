import StudentModel from '../schemas/student.js';
import CountryRepository from '../common/country.js';

const StudentRepository = {
    // @{function} get student by id
    // @{param} id
    get_student_by_id: async (id) => {
        return await StudentModel.findById(id);
    },
    // @{function} get student by email
    // @{param} email
    get_student_by_email: async (email) => {
        return await StudentModel.findOne({ email: email });
    },
    // @{function} get all students by country id
    // @{param} country_id
    get_students_by_country: async (country_id) => {
        return await StudentModel.find({ country: country_id });
    },
    // @{function} get all students by country code
    // @{param} country_code
    get_students_by_country_code: async (country_code) => {
        const country = await CountryRepository.get_country_by_code(country_code);
        return await StudentModel.find({ country: country._id });
    }
}



export default StudentRepository;