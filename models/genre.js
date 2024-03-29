
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreName : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    }
});

const Genre = mongoose.model('Genre',genreSchema);

function validateGenre(genre){
    const schema = Joi.object({
        genreName : Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;