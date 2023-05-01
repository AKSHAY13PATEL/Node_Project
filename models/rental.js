
const mongoose = require('mongoose');
const Joi = require('joi');


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
            customerName : {
                type : String,
                required : true,
                minlength : 5,
                maxlength : 255
            },
            isGold : { type : String, required : true},
            phone : {type : Number, required : true}
        }),
        required : true 
    },
    
    movie : {
        type : new mongoose.Schema({
            title : {
                type : String,
                required : true,
                minlength : 5,
                maxlength : 255
            },
            dailyRentalRate : { type : Number}
        }),
        required : true
    },

    purchaseDate : {
        type : Date,
        default : Date.now
    },
    returnedDate : {
        type : Date
    },
    rentalFee : {
        type : Number,
        min : 0
    }
}));

function validateRental(rental){
    const schema = Joi.object({
        customerId : Joi.string().required(),
        movieId : Joi.string().required()
    })

    return schema.validate(rental, {allowUnknown : true});
}

module.exports.validateRental = validateRental;
module.exports.Rental = Rental;

