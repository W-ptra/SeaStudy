const { login,register } = require("../service/authentication");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post('/register',async (req,res)=>{
    const newUser = {
        email:      req.body.email,
        name:       req.body.name,
        password:   req.body.password
    }

    const respond = await register(newUser);
    if(!respond.operation)
        return res.status(400).json({message:respond.message});

    return res.status(200).json({message:respond.message});
});

router.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const respond = await login(email,password);
    if(!respond.operation)
        return res.status(respond.status).json({message:respond.message});
    
    const token = jwt.sign({id: respond.user.id, role: respond.user.role}, process.env.KEY, {expiresIn:"1h"});
    res.cookie('token',token,{httpOnly:true,secure:true})
    return res.status(respond.status).json({message:respond.message});
});

router.get('/logout',(req,res)=>{
    //const 
    res.cookie('token','',{httpOnly:true,secure:true,expires: new Date(0) })
    return res.status(200).json({message:"logout sucessfull"});
})

module.exports = router;