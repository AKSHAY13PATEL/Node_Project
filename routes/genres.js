
const express = require('express');
const router = express.Router();

const {Genre, validateGenre} = require('../models/genre');
const {Movie , validateMovie} = require('../models/movie');
const { route } = require('./movies');

router.get('/', async (req,res) => {

    const genre = await Genre.find();
    res.send(genre);
})


router.post('/', async (req,res)=>{
    
    
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //crete new genre
    const genre = new Genre({
        genreName : req.body.genreName
    });

    await genre.save();
    res.send(genre);
    res.end();
    
})

router.delete('/', async (req,res)=>{

    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const deletedGenre = await Genre.findOneAndDelete({genreName : req.body.genreName});
    res.send(deletedGenre);
})
module.exports = router;
