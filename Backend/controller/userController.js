const {isAuthorized} = require("../middleware/auth")
const {getUserById} = require("../service/user");
const express = require("express");
const router = express.Router();

router.use(isAuthorized)

router.get('/',async (req,res)=>{
    const userId = parseInt(req.user.id);
    
    const respond = await getUserById(userId);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });
    
    return res.status(200).json(respond);
})

module.exports = router;