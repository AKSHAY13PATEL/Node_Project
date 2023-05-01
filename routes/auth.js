
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');

const {User} = require('../models/user');

router.post('/', async (req,res)=>{
    
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('email or password is invalid');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('email or password is invalid');

    res.send('User authenticated');

})

function validateUser(user){
    const schema = Joi.object({
        email : Joi.string().min(3).max(255).required().email()
    });
    return schema.validate(user,{allowUnknown:true});
}

module.exports = router;
