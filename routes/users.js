
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {User, validateUser} = require('../models/user');

router.get('/', async (req,res) => {

    const user = await User.find();
    res.send(user);
})


router.post('/', async (req,res)=>{
    
    
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const validUser = await User.findOne({email : req.body.email});
    if(validUser) return res.status(400).send('USer already exist with given email');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //crete new user
    const user = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : hashedPassword
    });

    try{
        await user.save();
        res.send(user);
        res.end();
    }
    catch(error){
        console.log(error.message);
        return res.status(400).send(error.message);
    }
    
})

module.exports = router;
