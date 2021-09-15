require('dotenv').config();

const debug = require('debug')('findadmission:db');
import mongoose from 'mongoose';


mongoose.connection.on('connecting', function(){ debug('☢️  main event -- mongosh connecting ⏰ ...', ) });
mongoose.connection.on('connected', function(){ debug('☢️  main event -- mongosh connected successfully ✅  ...') });
mongoose.connection.on('all', function(){ debug('☢️  main event -- mongosh connected all replicatset successfully 💯  ...') });
mongoose.connection.on('disconnected', function(){ debug('☢️  main event -- mongosh disconnected 🤯 ...') });
mongoose.connection.on('disconnecting', function(){ debug('☢️  main event -- mongosh disconnecting 🤯 ...') });
mongoose.connection.on('error', function(err){ debug(`☢️  main event -- mongosh boom error ❌ ... `, err); });


const IS_PROD = process.env.NODE_ENV === 'production';
const DEFAULT_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const config = {
    default: DEFAULT_CONFIG,
    db_server_url: IS_PROD ? process.env.DB_SERVER_URL : process.env.DB_SERVER_URL_DEV,
}
async function run_connect_default_persistence_db(){
    try {
        let db_server = await mongoose.connect(config.db_server_url, { ...config.default, });
        return db_server;
    } catch (error) {
        debug(`☢️  main event -- mongosh boom error ❌ ... `, error);
    }
}


export default run_connect_default_persistence_db;