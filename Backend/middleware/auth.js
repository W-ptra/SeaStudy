const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateJWT(req,res,next){
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({message:"Token is required"});

    jwt.verify(token,process.env.KEY,(err,user)=>{
        if(err){
            res.cookie('token','',{httpOnly:true,secure:true,expires: new Date(0)});
            return res.status(403).json({message:"Forbidden"});
        }
        next();
    });
}

module.exports = {authenticateJWT};