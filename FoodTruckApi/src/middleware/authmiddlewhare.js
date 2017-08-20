// this module handles the authentication process

import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*30; // how long the TOKEN will be valid in seconds!
const SECRET = "W3 GR4 THY^"; // this is the private key that create the TOKEN. not to be lost

let authenticate = expressJwt({secret: SECRET}); //express json web token

// this use passport module to create an access token

let generateAccessToken = (req, res, next) =>{
    req.token = req.token || {};  
    req.token = jwt.sign({
        id: req.user.id,
    }, SECRET, {
        expiresIn: TOKENTIME
    });
    next(); // it's a middleware so me need to pass next
}

let respond = (req, res) =>{
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

module.exports = {
    authenticate,
    generateAccessToken,
    respond
}
