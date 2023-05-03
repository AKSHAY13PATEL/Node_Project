
const Joi = require('joi');
const mongoose = require('mongoose');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    }
});

userSchema.methods.genAuthToken = function(){
    return jwt.sign({_id: this._id},config.get('JWT_PRIVATE_KEY'));
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = Joi.object({
        userName : Joi.string().min(3).max(50).required(),
        email : Joi.string().min(3).max(255).required().email(),
        password : joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .required(),
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;