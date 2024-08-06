const { login,register } = require("../service/authentication");
const express = require("express");
const router = express.Router();

router.post('/auth/register',async (req,res)=>{
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

router.post('/auth/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const respond = await login(email,password);
    if(!respond.operation)
        return res.status(respond.status).json({message:respond.message});

    //add JWT here
    return res.status(respond.status).json({message:respond.message});
});

module.exports = router;