import {Router} from 'express';
import Accounts from '../models/accounts';
import passport from 'passport';
import config from '../config';

import {generateAccessToken, respond, authenticate} from '../middleware/authmiddlewhare';

export default ({config, db}) => {
    let api = Router();

    // /vi/account/
    // register form    
    api.post('/register', (req, res) => {
        Accounts.register(new Accounts({username: req.body.email}), req.body.password, function(err){
            if (err){
                res.send(err);
            }
            res.status(200).send(`User ${req.body.email} is now registered.`);
        });
    });

    api.post('/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
        }), generateAccessToken, respond);


    api.get('/logout', authenticate, (req, res) => {
        req.logout();
        res.status(200).send('Successfully logge out');
    });

    api.get('/me', authenticate, (req, res) => {
        res.status(200).json(req.user);
    })

    return api;
}