
const express = require('express');
const router = express.Router();

const {User, validateUser} = require('../models/user');

router.get('/', async (req,res) => {

    const user = await User.find();
    res.send(user);
})


router.post('/', async (req,res)=>{
    
    
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //crete new user
    const user = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
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
