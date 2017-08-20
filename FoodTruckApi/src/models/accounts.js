import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose'; 
// we can use different way of passporting google soft token etc we use local

let Accounts = new Schema({
    email: String,
    password: String

});

Accounts.plugin(passportLocalMongoose); // we use plug in passport on the model
// plug in exposes function imported from passport-local-mongoose!! like serializeUser

module.exports = mongoose.model('Account', Accounts);