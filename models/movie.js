
const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre.js');


const movieSchema = mongoose.Schema({
    title : {type: String , required : true},
    genre : {
        type : genreSchema
    },
    numberInStock : Number,
    dailyRentalRate : Number
});

const Movie = mongoose.model('Movie',movieSchema);

function validateMovie(movie){
    //input validation
    console.log(movie);
    schema = Joi.object({
        title : Joi.string().min(3).max(255).required(),
        genreName : Joi.string().min(4).max(255).required()
    });

    return schema.validate(movie, {allowUnknown : true});
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;