

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const {Movie , validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/', async (req,res) => {

    const movie = await Movie.find();
    res.send(movie);
})

router.get('/:id', async (req,res)=>{
    //check for given id 
    //if not exist give 404 response
    
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).send('Movie with given id does not found');
        res.send(movie);
    }
    catch(ex){
        res.send('Please enter valid ID');
    }
    

})

router.post('/',async (req,res)=>{
    
    const {error} = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre= await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Genre with given id does not found');

    //crete new movie
    const movie = new Movie({
        title : req.body.title,
        genre : {
            _id : genre._id,
            genreName : genre.genreName
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);
    res.end();
    
})


router.put('/:id', async (req,res) => {
    //check given id
    try{
        let movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).send('Movie with given id does not found');
    }
    catch(ex){
        res.send('Please enter valid ID');
    }
    
    const {error} = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let updater = {
        title : req.body.title,
        genre : {
            name : req.body.genre
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate 
    };
    let movieResult = await Movie.findByIdAndUpdate(req.params.id, updater, {new : true});
    res.send(movieResult);
    res.end();
})

router.delete('/:id',async (req,res)=> {
    //check given id
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).send('Movie with given id does not found');
        res.send(movie);
    }
    catch(ex){
        res.send('Please enter valid ID');
    }
    
    movie = await Movie.findByIdAndDelete(req.params.id);
    res.send(movie);
})


module.exports = router;