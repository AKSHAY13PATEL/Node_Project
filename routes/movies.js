

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const {Movie , validateMovie} = require('../models/movie');


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
    
    //crete new id and update it to database
    const movie = new Movie({
        movie_name : req.body.movie_name,
        genre : req.body.genre
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
    
    let movieResult = await Movie.findByIdAndUpdate(req.params.id,{movie_name : req.body.movie_name, genre : req.body.genre},{new : true});
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