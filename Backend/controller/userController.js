const {isAuthorized} = require("../middleware/auth")
const {getUserById} = require("../service/user");
const { getEnrolledCourses, getCreatedCourses } = require("../service/user");
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

router.get('/course',async (req,res)=>{
    const userId = parseInt(req.user.id);
    const role = req.user.role;

    const respond = (role === "User") ? await getEnrolledCourses(userId) : await getCreatedCourses(userId);
    console.log(respond);

    if(!respond.operation) 
        return res.status(400).json({ message: respond.message });

    return res.status(respond.status).json(respond.data);
});

module.exports = router;