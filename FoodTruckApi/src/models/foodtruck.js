// here we write the model for mongo 
import mongoose from 'mongoose';
import Reviews from './reviews';

let Schema = mongoose.Schema; // blueprint for the data model

let FoodTuckSchema = new Schema({
    name: {type: String, required: true},
    foodtype: {type: String, required: true},
    avgcost: Number,
    geometry: {
        type: {type: String, default: 'Point'},
        coordinates: [Number] // array of number
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}] // array of type object id
});

module.exports = mongoose.model('FoodTruck',FoodTuckSchema);

