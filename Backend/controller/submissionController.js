const {authenticateJWT,isAuthorized} = require("../middleware/auth");
const submission = require("../service/submission");
const express = require("express");
const router = express.Router();

router.get('/assignment/:assignmentid',authenticateJWT("Instructor"),async (req,res)=>{
    let assignmentid = req.params.assignmentid;
    assignmentid = parseInt(assignmentid,10);

    const respond = await submission.getAllSubmissionByAssignmentId(assignmentid);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.use(authenticateJWT("User"));

router.get('/user',async (req,res)=>{
    const userid = parseInt(req.user.id);
    const respond = await submission.getAllSubmissionByUserId(userid);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.post('/',async (req,res)=>{
    const newSubmission = {
        score:          parseFloat(req.body.score),
        isGraded:       Boolean(req.body.isGraded === "true"),
        content:        req.body.content,
        assignmentId:   parseInt(req.body.assignmentId),
        userId:         parseInt(req.user.id)
    }

    const respond = await submission.createNewSubmission(newSubmission);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.put('/:submissionid',async (req,res)=>{
    const updatedSubmission = {
        id:             parseInt(req.params.submissionid),
        score:          parseFloat(req.body.score),
        isGraded:       Boolean(req.body.content === "true"),
        content:        req.body.content,
        assignmentId:   parseInt(req.body.assignmentId)
    }
    
    const respond = await submission.updateSubmission(updatedSubmission);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

module.exports = router;