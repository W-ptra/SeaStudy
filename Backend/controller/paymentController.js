const {authenticateJWT} = require("../middleware/auth")
const payment = require("../service/payment");
const express = require("express");
const router = express.Router();

router.use(authenticateJWT("User"));

router.put('/topup',async (req,res)=>{
    const userId = Number(req.user.id);
    const amount = parseInt(req.body.amount);
    const respond = await payment.topUp(userId,amount);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    const int = Number(respond.credit)
    respond.credit = int
    respond.message = "Top Up Successfull"
    return res.status(200).json(respond);
})

router.post('/course',async (req,res)=>{
    const userId = parseInt(req.user.id);
    const courseId = parseInt(req.body.courseId);

    const respond = await payment.purchaseCourse(userId,courseId);
    console.log(respond);

    if (!respond.operation){
        console.log("trigger");
        return res.status(400).json({ message: respond.message });
    }

    return res.status(200).json(respond);
})

module.exports = router;