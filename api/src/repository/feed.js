import { Types } from 'mongoose';
import FeedModel from "../schemas/feed";


const feedRepository = {
    // create new feed
    async create_new_feed(payload){
        const feed = new FeedModel(payload);
        return await feed.save();
    },
    // get feed by id
    async get_feed_by_id(id){
        return await FeedModel.findById(id);
    },
    // get all feeds
    async get_all_feeds_sorted_paginated({ id, page, limit, sort }){
        let aggregation_pipeline = [
            {
                '$match': {
                    institution: Types.ObjectId(id)
                }
            }, {
                '$addFields': {
                    'reactions': { '$add': [ { '$size': "$likes" }, { '$size': "$comments" } ] }
                }
            }, {
                '$lookup': {
                    from: 'Comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'comments'
                }
            }, {
                '$sort': {
                    [sort] : -1
                }
            }, {
                '$facet': {
                    'metadata': [ { '$count': 'total' } ],
                    'data': [ { '$skip': page * limit }, { '$limit': limit } ]
                }
            }, {
                '$project': {
                    'data': 1,
                    'total': { '$arrayElemAt': [ '$metadata.total', 0 ] }
                }
            }
        ]
        const feeds = await FeedModel.aggregate(aggregation_pipeline);
        return {
            feeds: feeds[0].data || [],
            total: feeds[0].total || 0,
        };
    },
    async get_all_student_feeds_sorted_paginated({ id, region, page, limit, sort, follows }){
        let aggregation_pipeline = [
            {
                '$match': {
                    '$or': [
                        { 'institution': { '$in': follows } },
                        { 'ambassador': { '$in': follows } }
                    ],
                    'regions': { '$in': [ region ] }
                }
            }, {
                '$addFields': {
                    'reactions': { '$add': [ { '$size': "$likes" }, { '$size': "$comments" } ] }
                }
            }, {
                '$lookup': {
                    from: 'Comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'comments'
                }
            }, {
                '$sort': {
                    [sort] : -1
                }
            }, {
                '$facet': {
                    'metadata': [ { '$count': 'total' } ],
                    'data': [ { '$skip': page * limit }, { '$limit': limit } ]
                }
            }, {
                '$project': {
                    'data': 1,
                    'total': { '$arrayElemAt': [ '$metadata.total', 0 ] }
                }
            }
        ];
        const feeds = await FeedModel.aggregate(aggregation_pipeline);
        return {
            feeds: feeds[0].data || [],
            total: feeds[0].total || 0,
        };
    }
}


export default feedRepository;