import institutionModel from "../schemas/institution";


const institutionRepository = {
    // get one institution by identifier
    async get_institution_by_id(id) {
        return await institutionModel.findById(id);
    },
    // get institutions sorted paginated filtered by query
    async get_institutions_sorted_populated_paginated({ page, limit, query, sort }) {
        let pagination = {
            page, limit,
            [sort] : -1,
            lean: true,
        };
        let institutions = await institutionModel.paginate(query, pagination);
        return institutions;
    }
}


export default institutionRepository;