
const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    isGold : Boolean,
    customerName : {type : String, required : true},
    phone : Number
});

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(body){
    const schema = Joi.object({
        customerName : Joi.string().min(3).max(10).required(),
        phone : Joi.number().min(1000000000)
    });

    return schema.validate(body, { allowUnknown: true });
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
