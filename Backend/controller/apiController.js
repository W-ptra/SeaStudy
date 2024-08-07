const {authenticateJWT} = require('../middleware/auth');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/',authenticateJWT,(req,res)=>{
    res.send("hello world")
})

module.exports = router;