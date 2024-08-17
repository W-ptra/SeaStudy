const jwt = require('jsonwebtoken');
const { validateJSONToken } = require('../helper/jwt');
require("dotenv").config();

const authenticateJWT = (allowedRole) => async (req,res,next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).send('Token is required');
    }
    const authToken = authorization.split(' ')[1]

    try {
        const decoded = await validateJSONToken(authToken);
        
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
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).send('Token is required');
    }
    
    const authToken = authorization.split(' ')[1]

    try {
        const decoded = await validateJSONToken(authToken);
        
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