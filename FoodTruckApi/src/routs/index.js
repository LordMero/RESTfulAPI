import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import foodtruck from '../controller/foodtruck';
import account from '../controller/accounts';

let router = express();

// connect to db 
initializeDb(db => {
    // internal middleware
    router.use(middleware({config, db}));
    // api routes v1 (/v1) because so said in setting up exprress
    router.use('/foodtruck', foodtruck({config, db}));  //foodtruck is a controller
    router.use('/account', account({config, db}));
});

export default router;