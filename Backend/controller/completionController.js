const {authenticateJWT} = require("../middleware/auth");
const completion = require("../service/completion");
const express = require("express");
const router = express.Router();

router.use(authenticateJWT("User"));

router.post('/',async (req,res)=>{
    const newCompletion = {
        topicId:        parseInt(req.body.topicId,10),
        userId:         parseInt(req.body.userId,10)
    }

    const respond = await completion(newCompletion);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

module.exports = router;