
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {User, validateUser} = require('../models/user');



router.get('/',async (req,res)=>{
    //get all user data from and return it to client
    const user = await User.find();
    if(!user) return res.status(404).send('NO record found');    
    res.send(user);
})

router.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById({_id : req.params.id});
        if(!user) return res.status(404).send('User with given id does not found');
        res.send(user);
    }
    catch(ex){
        res.send('Please enter valid ID');
    }
})

router.post('/', async (req,res)=>{
    //validate the input
    const {error,value} = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    //save to databse
    const user = new User({
        isGold : value.isGold,
        userName : value.userName,
        phone : value.phone
    })

    await user.save();
    res.send(user);
})

router.put('/:id',async (req,res)=>{
    //search for id
    try{                
        let user = await User.findById({_id : req.params.id});
        if (!user) return res.status(404).send('User with given id does not found');
    }
    catch(ex){
        res.send('Please enter valid ID');
    }

    //validate input
    const {error,value} = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    //save to database
    let updater = {isGold : req.body.isGold, userName : req.body.userName, phone : req.body.phone };
    user = await User.findByIdAndUpdate({_id :  req.params.id}, updater , {new : true});
    res.send(user);
})

router.delete('/:id', async (req,res)=>{
    //search for id
    try{                
        let user = await User.findById({_id : req.params.id});
        if (!user) return res.status(404).send('User with given id does not found');
    }
    catch(ex){
        res.send('Please enter valid ID');
    }

    user = await User.findByIdAndDelete({_id : req.params.id});
    res.send(user);
})



module.exports = router;