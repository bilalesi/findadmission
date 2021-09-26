import InstitutionModel from "../schemas/institution";


const institutionRepository = {
    // get one institution by identifier
    async get_institution_by_id(id) {
        return await InstitutionModel.findById(id);
    },
    // get institutions sorted paginated filtered by query
    async get_institutions_sorted_populated_paginated({ page, limit, query, sort }) {
        let pagination = {
            page, limit,
            [sort] : -1,
            lean: true,
        };
        let institutions = await InstitutionModel.paginate(query, pagination);
        return institutions;
    },
    create_new_institution: async (institution) => {
        let _institution = await InstitutionModel.create(institution);
        return _institution;
    },
    update_pin: async ({ id, pin, pin_reset_counter }) => {
        return await InstitutionModel.findByIdAndUpdate(id, { six_6_degit_pin: pin, pin_reset_counter }, { new: true });
    },
    update_validation_token: async ({ id, token, expire_at }) => {
        return await InstitutionModel.findByIdAndUpdate(id, {
            email_verification_token: token,
            email_verification_token_expire: expire_at
        }, { new: true });
    },
    update_institution: async ({ id, institution }) => {
        return (await InstitutionModel.findByIdAndUpdate(id, institution, { new: true }));
    }
}


export default institutionRepository;