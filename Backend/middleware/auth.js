const jwt = require('jsonwebtoken');
const { validateJSONToken } = require('../helper/jwt');
require("dotenv").config();

const authenticateJWT = (allowedRole) => async (req,res,next) => {
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({message:"Token is required"});

    try {
        const decoded = await validateJSONToken(token);
        
        if(decoded.role !== allowedRole){
            return res.status(403).json({ message: "Access denied" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.cookie('token', '', { httpOnly: true, secure: true, expires: new Date(0) });
        return res.status(401).json({message:"Unauthorized", error: err.message});
    }
}

async function isAuthorized(req,res,next){
    const token = req.cookies.token;
    
    try {
        const decoded = await validateJSONToken(token);
        
        if(decoded.role !== "User" && decoded.role !== "Instructor")
            return res.status(403).json({ message: "Access denied" });

        req.user = decoded;
        next();
    } catch (err) {
        res.cookie('token', '', { httpOnly: true, secure: true, expires: new Date(0) });
        return res.status(401).json({message:"Unauthorize, please login first to access this resource"});
    }
}

module.exports = { authenticateJWT,isAuthorized };