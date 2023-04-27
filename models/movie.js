
const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movie_name : {type: String , require : true},
    genre : {type : [String] }
});

const Movie = mongoose.model('Movie',movieSchema);

function validateMovie(body){
    //input validation
    schema = Joi.object({
        movie_name : Joi.string().min(3).max(20).required(),
    });

    return schema.validate(body, {allowUnknown : true});
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;