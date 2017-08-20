// configuration file for mongodb

import mongoose from 'mongoose';
import config from './config';

export default callback => { 
    let db = mongoose.connect(config.mongoUrl, {useMongoClient: true});
    callback(db);
}