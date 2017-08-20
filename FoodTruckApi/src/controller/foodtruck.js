import {Router} from 'express';
import FoodTruck from '../models/foodtruck';
import Reviews from '../models/reviews.js';

// this is the controller for the object foodtruck in our database
// operations done on the database can be of type CRUD, Create, Read, Update and Delete
// POST = Create, PUT = Update, GET=Read and DELETE=delete http command to deal with the CRUD operations

//===============================================================
// we import authenticate from our middleware to lock in path we require the access to
import {authenticate} from '../middleware/authmiddlewhare'



export default ({config, db}) => {
    let api = Router();

    // create route 
    api.post('/add', authenticate, (req, res)=>{
        let newFT  = new FoodTruck; // create a new moongoose model 
        newFT.name = req.body.name; // getting the name from the client in the request body
        newFT.foodtype = req.body.foodtype;
        newFT.avgcost = req.body.avgcost;
        newFT.geometry.coordinates = req.body.geometry.coordinates;

        newFT.save(err => { // saving object in mongo passing a function to handle error
            if (err) {
                res.send(err);
            }
            res.json({message: 'FoodTruck create successfully!'});
        });
    })

    // read
    //path /v1/foodtruck
    api.get('/', authenticate, (req, res)=>{
        FoodTruck.find({},(err, foodtrucks)=>{ // find({what to look for}, function to return)
            if (err){
                res.send(err);
            }
            res.json(foodtrucks);
        })
    })

    // find by id
    // /v1/foodtruck/:id -- the :id indicate that id is a parameter we pass
    api.get('/:id', authenticate, (req, res)=>{
        FoodTruck.findById(req.params.id, (err, foodtruck)=>{
            if (err){
                res.send(err);
            }
            res.json(foodtruck);
        })
    })

    // update record
    // put request on /v1/foodtruck/:id
    api.put('/:id', authenticate, (req, res)=>{
        FoodTruck.findById(req.params.id, (err, foodtruck)=>{
            if (err){
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.foodtype = req.body.foodtype;
            foodtruck.avgcost = req.body.avgcost;
            foodtruck.geometry.coordinates = req.body.geometry.coordinates;
            foodtruck.save(err => {
                if (err){
                    res.send(err);
                }
                res.json({'message': 'foodtruck updated.'})
            })
        })
    })
    // delete record
    api.delete('/:id', authenticate, (req, res)=>{
        FoodTruck.remove({
            _id: req.params.id}, err=>{
            if (err){
                res.send(err);
            }
            res.json({'message': 'foodtruck removed successfully'});
        })
    })

    // get all the trucks for a specific food type
    api.get('/typefood/:typefood', authenticate, (req, res)=>{
        FoodTruck.find({foodtype: req.params.typefood}, (err, trucks)=>{
            if (err){
                res.send(err);
            }
            res.json(trucks);
        })
    })

    // get all the entry with an average cost 
    api.get('/avgcost/:avgcost', authenticate, (req, res)=>{
        FoodTruck.find({avgcost: req.params.avgcost}, (err, truck)=>{
            if (err){
                res.send(err);
            }
            res.json(truck);
        })
    })
    
    // handling reviews
    // create 
    api.post('/reviews/add/:id', authenticate, (req, res)=>{    
        // when we add the review we first look for the truck
        FoodTruck.findById(req.params.id, (err, foodtruck)=>{
            if (err){
                res.send(err);
            }
            // if no error we populate the review model
            let newR = new Reviews;

            newR.title = req.body.title;
            newR.text = req.body.text;
            newR.foodtruck = req.params.id;
            // we save it on db
            newR.save(err=>{
                if (err){
                    res.send(err);
                }
                // update also the foodtruck db with the review
                foodtruck.reviews.push(newR); // because reviews is an array of ids
                                            // we use push to insert stuff in the array
                foodtruck.save(err=>{
                    if (err){
                        res.send(err);
                    }
                    res.json({message: 'FoodTruck review Saved!'})
                })
            })
        })

        // retrieve all reviews for a specific truck
        api.get('/reviews/:id', authenticate, (req, res)=>{
            //fid all the reviews with foodtruck id as passed
            Reviews.find({foodtruck: req.params.id}, (err, rev)=>{
                if (err){
                    res.send(err);
                }
                res.json(rev);
            })
        })

        



        // get all reviews for a specific type of food
        api.get('/reviews/foodtype/:foodtype', authenticate, (req, res)=>{
            


        })
        // delete reviews for specific truck
            // delete record
        api.delete('/reviews/:id', authenticate, (req, res)=>{
            Reviews.remove({
                _id: req.params.id}, err=>{
                if (err){
                    res.send(err);
                }
                res.json({'message': 'foodtruck review removed successfully'})
            })
        })

        









    })
    return api
}