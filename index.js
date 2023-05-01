
//module loading
const express = require('express');
const movie = require('./routes/movies');
const customer = require('./routes/customers');
const genre =  require('./routes/genres');
const rental =  require('./routes/rentals');
const mongoose = require('mongoose');

const app = express();

//middleware function
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use('/api/movie',movie);
app.use('/api/customer',customer);
app.use('/api/genre',genre);
app.use('/api/rental',rental);


//connecting to databse
mongoose.connect('mongodb://127.0.0.1:27017/movieDB')
    .then(()=> console.log("Connection successful"))
    .catch((error)=>{
        console.log('Error connecting to database' ,error.message);
    });


//root of the project
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to My Movie listing website</h1>");
})

//listening on port 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`listening on port : ${port}`);
});
