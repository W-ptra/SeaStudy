const express = require('express');
const morgan = require('morgan');
const apiController = require('./controller/apiController');
require("dotenv").config()
const app = express()

app.use(morgan('combined'));
app.use(express.json())

app.use('/api',apiController);

app.get('/',(req,res)=>{
    res.send("test 123");
});

app.use((req,res)=>{
    res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`listening to port ${process.env.PORT}`);
})