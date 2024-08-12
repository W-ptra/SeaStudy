const {authenticateJWT} = require("../middleware/auth")
const payment = require("../service/payment");
const express = require("express");
const router = express.Router();

router.use(authenticateJWT("User"));

router.put('/',async (req,res)=>{
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

module.exports = router;