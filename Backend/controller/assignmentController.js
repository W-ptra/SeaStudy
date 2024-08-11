const assigment = require("../service/assignment");
const express = require("express");
const router = express.Router();

router.post('/',async (req,res)=>{
    const newAssignment = {
        name:           req.body.name,
        description:    req.body.description,
        topicId:        parseInt(req.body.topicId,10)
    }

    const respond = await assigment.createNewAssignment(newAssignment);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.put('/:assignmentid',async (req,res)=>{
    const updateAssignment = {
        id:             parseInt(req.params.assignmentid,10),
        name:           req.body.name,
        description:    req.body.description,
        topicId:        parseInt(req.body.topicId,10)
    }

    const respond = await assigment.updateAssignment(updateAssignment);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.delete('/:assignmentid',async (req,res)=>{
    const id = parseInt(req.params.assignmentid,10);

    const respond = await assigment.deleteAssignment(id);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

module.exports = router;