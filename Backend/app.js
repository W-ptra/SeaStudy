const express = require('express');
const morgan = require('morgan');
const app = express()
require("dotenv").config()

app.use(morgan('combined'));
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("test 123");
});

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`listening to port ${process.env.PORT}`);
})