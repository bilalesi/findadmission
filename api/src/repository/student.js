import StudentModel from '../schemas/student.js';
import CountryRepository from './country';

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
    update_pin: async ({ id, pin, pin_reset_counter }) => {
        return await StudentModel.findByIdAndUpdate(id, { six_6_degit_pin: pin, pin_reset_counter }, { new: true });
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
        console.log('create_new_student', student);
        let _student = await StudentModel.create(student);
        console.log('create_new_student', _student);
        return _student;
    },
    get_all_students_by_emailOrPhone: async ({ email = "", phone = "" }) => {
        return await StudentModel.find({ '$or': [ { email }, { phone } ] });
    },
    get_student_object_without_password: async (id) => {
        return await StudentModel.findById(id).select('-password').lean();
    },
    update_student: async ({ id, student }) => {
        return await StudentModel.findByIdAndUpdate(id, student, { new: true });
    },
    get_student_wishlist_populated: async (id) => {
        return await StudentModel.findById(id).populate({ path: 'wishlist' }).lean();
    },
    get_student_reduced_profile: async ({ id }) => {
        let student = await StudentModel.findById(id).lean();
        return {
            wishlist: student.wishlist.length || 0,
            following: (Number(student.follows.length) + Number(student.follows_ambassadors.length)) || 0,
            points: student.points || 0,
        }
    }
}



export default StudentRepository;