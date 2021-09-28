import institutionUserModel from "../schemas/institution-user";

const institutionUserRepository = {
     // get one institution by identifier
    async get_institution_user_by_id(id) {
        return (await institutionUserModel.findById(id).lean());
    },
    async get_institution_user_by_id_basic(id) {
        return (await institutionUserModel.findById(id));
    },
    async get_institution_user_by_email(email) {
        return (await institutionUserModel.findOne({ email }));
    },
    create_new_institution_user: async (institutionUser) => {
        let _institutionUser = await institutionUserModel.create(institutionUser);
        return _institutionUser;
    },
    async update_institution_user({ id, institutionUser }) {
        return (await institutionUserModel.findByIdAndUpdate(id, institutionUser, { new: true }));
    }
}


export default institutionUserRepository;