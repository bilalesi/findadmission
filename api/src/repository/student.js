import StudentModel from '../schemas/student.js';
import CountryRepository from '../common/country.js';

const StudentRepository = {
    // @{function} get student by id basic
    // @{param} id
    get_student_by_id_basic: async (id) => {
        return await StudentModel.findById(id);
    },
    // @{function} get student by id
    // @{param} id
    get_student_by_id: async (id) => {
        return await StudentModel.findById(id).lean();
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
    },
    // @{function} save six degit pin for signup
    // @{param0} id: student id
    // @{param1} pin: six (06) degit pin number
    update_pin: async ({ id, pin }) => {
        return await StudentModel.findByIdAndUpdate(id, { six_6_degit_pin: pin }, { new: true });
    },
    // @{function} save signed token for sign up
    // @{param0} id: student id
    // @{param1} token: jwt signed token
    // @{param2} expire_at: date for when expire token
    update_validation_token: async ({ id, token, expire_at }) => {
        return await StudentModel.findByIdAndUpdate(id, {
            email_verification_token: token,
            email_verification_token_expire: expire_at
        }, { new: true });
    }, 
    create_new_student: async (student) => {
        let student = await StudentModel.create(student);
        return student;
    },
    get_all_students_by_emailOrPhone: async ({ email, phone }) => {
        return await StudentModel.find({ '$or': [ { email }, { phone } ] });
    },
    get_student_object_without_password: async (id) => {
        return await StudentModel.findById(id).select('-password').lean();
    }
}



export default StudentRepository;