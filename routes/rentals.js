

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Rental , validateRental} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');


router.post('/',async (req,res)=>{
    
    
    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer= await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('customer with given id does not found');

    const movie= await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('movie with given id does not found');

    //crete new movie
    const rental = new Rental({
        customer : {
            _id : customer._id,
            customerName : customer.customerName,
            isGold : customer.isGold,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }
    });

    /* session = await mongoose.startSession();
    try{
        let temp = movie.numberInStock--;
        session.withTransaction(async ()=>{
            await movie.save();
            await rental.save();
            console.log('within transcation');
            console.log('number in stock',temp);
        })
    }
    catch(error){
        console.log('Aborted',error);
    }finally{
        console.log('session ended');
        session.endSession();
    } */

    movie.numberInStock--;
    console.log(movie);
    await movie.save();
    await rental.save();
    res.send(rental);    
    
})


module.exports = router;