
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    isGold : Boolean,
    userName : {type : String, required : true},
    phone : Number
});

const User = mongoose.model('User',userSchema);

function validateUser(body){
    const schema = Joi.object({
        userName : Joi.string().min(3).max(10).required(),
        phone : Joi.number().min(1000000000)
    });


    return schema.validate(body, { allowUnknown: true });
}

module.exports.User = User;
module.exports.validateUser = validateUser;
