import http from 'http'; // remember to use https if we want to use authetication
import express from 'express';
import bodyParser from 'body-parser';
// these are needed for authentication purposes
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

// specify stuff outside the main app an import
import config from './config'; //because we are not specifing what to import it's going to look for index.js inside config      
import routs from './routs';


// create the app
let app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyParser.json({
    limit: config.bodyLimit  // we limit the dimention of the body in a post request
})),

//passport config
app.use(passport.initialize()); // first init
let Account = require('./models/accounts');
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());




//api routs
app.use('/v1',routs);

app.server.listen(config.port);

console.log(`Server is running on port: ${app.server.address().port}`);

export default app;

// default works with import and import the default export in this case app