
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const { Customer, validateCustomer} = require('../models/customer');



router.get('/',async (req,res)=>{
    //get all customer data from and return it to client
    const customer = await Customer.find();
    if(!customer) return res.status(404).send('NO record found');    
    res.send(customer);
})

router.get('/:id', async (req,res)=>{
    try{
        
        const customer = await Customer.findById({_id : req.params.id});
        if(!customer) return res.status(404).send('Customer with given id does not found');
        res.send(customer);
    }
    catch(ex){
        res.send('Please enter valid ID');
    }
})

router.post('/', async (req,res)=>{
    //validate the input
    const {error,value} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    //save to databse
    const customer = new Customer({
        isGold : value.isGold,
        customerName : value.customerName,
        phone : value.phone
    })

    await customer.save();
    res.send(customer);
})

router.put('/:id',async (req,res)=>{
    //search for id
    try{                
        let customer = await Customer.findById({_id : req.params.id});
        if (!customer) return res.status(404).send('Customer with given id does not found');
    }
    catch(ex){
        res.send('Please enter valid ID');
    }

    //validate input
    const {error,value} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    //save to database
    let updater = {isGold : req.body.isGold, customerName : req.body.customerName, phone : req.body.phone };
    customer = await Customer.findByIdAndUpdate({_id :  req.params.id}, updater , {new : true});
    res.send(customer);
})

router.delete('/:id', async (req,res)=>{
    //search for id
    try{                
        let customer = await Customer.findById({_id : req.params.id});
        if (!customer) return res.status(404).send('Customer with given id does not found');
    }
    catch(ex){
        res.send('Please enter valid ID');
    }

    customer = await Customer.findByIdAndDelete({_id : req.params.id});
    res.send(customer);
})



module.exports = router;