const submission = require("../service/submission");
const express = require("express");
const router = express.Router();

router.get('/assignment/:assignmentid',async (req,res)=>{
    let assignmentid = req.params.assignmentid;
    assignmentid = parseInt(assignmentid,10);

    const respond = await submission.getAllSubmissionByAssignmentId(assignmentid);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.get('/user/:userid',async (req,res)=>{
    let userid = req.params.userid;
    userid = parseInt(userid,10);

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
        userId:         parseInt(req.body.userId)
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
    //console.log(updatedSubmission)
    const respond = await submission.updateSubmission(updatedSubmission);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

module.exports = router;