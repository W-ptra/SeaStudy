const jwt = require('jsonwebtoken');
const { validateJSONToken } = require('../helper/jwt');
require("dotenv").config();

const authenticateJWT = (allowedRole) => (req,res,next) => {
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({message:"Token is required"});

    try {
        const decoded = validateJSONToken(token);
        
        if(decoded.role !== allowedRole){
            return res.status(403).json({ message: "Forbidden access" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message:"Unauthorized"});
    }
}

module.exports = {authenticateJWT};