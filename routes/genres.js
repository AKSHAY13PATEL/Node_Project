
const express = require('express');
const router = express.Router();

const {Genre, validateGenre} = require('../models/genre');
const {Movie , validateMovie} = require('../models/movie');

router.get('/', async (req,res) => {

    const genre = await Genre.find();
    res.send(genre);
})


router.post('/', async (req,res)=>{
    
    
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //crete new genre
    const genre = new Genre({
        name : req.body.genreName
    });

    await genre.save();
    res.send(genre);
    res.end();
    
})

module.exports = router;
