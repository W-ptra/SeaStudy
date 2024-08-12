const {isAuthorized} = require("../middleware/auth")
const {getUserById} = require("../service/user");
const express = require("express");
const router = express.Router();

router.use(isAuthorized)

router.get('/',async (req,res)=>{
    const userId = Number(req.user.id);
    const respond = await getUserById(userId);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });
    const int = Number(respond.data.credit)
    respond.data.credit = int

    return res.status(200).json(respond);
})

// router.get('/course',async (req,res)=>{
//     // get all course purchase/created by user
// })

module.exports = router;