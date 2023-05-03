
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Joi = require('joi');
const config = require('config');
const {User} = require('../models/user');

const router = express.Router();

router.post('/', async (req,res)=>{
    
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('email or password is invalid');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('email or password is invalid');

    const token = user.genAuthToken();
    res.header('x-auth-token',token).send('Logged in');

})

function validateUser(user){
    const schema = Joi.object({
        email : Joi.string().min(3).max(255).required().email()
    });
    return schema.validate(user,{allowUnknown:true});
}

module.exports = router;
