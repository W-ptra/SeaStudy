const jwt = require("jsonwebtoken");

exports.createJSONToken = (response) => {
    return jwt.sign({id: response.user.id, role: response.user.role}, process.env.KEY, {expiresIn:"1h"});
};

exports.validateJSONToken = (token) => {
    return jwt.verify(token,process.env.KEY,(err)=>{
        if(err){
            res.cookie('token','',{httpOnly:true,secure:true,expires: new Date(0)});
            return res.status(403).json({message:"Forbidden"});
        }
    });
};
