const {parameterCheckPost,parameterCheckPut} = require("../middleware/topicMiddleware");
const {authenticateJWT,isAuthorized} = require("../middleware/auth");
const topic = require("../service/topic");
const express = require("express");
const router = express.Router();

router.use(isAuthorized);

router.get('/course/:courseid',async (req,res)=>{
    let courseId = req.params.courseid;
    courseId = parseInt(courseId,10);
    
    const respond = await topic.getAllTopicByCourseId(courseId);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });
    
    return res.status(200).json(respond);
})

router.get('/:topicid',async (req,res)=>{
    let topicid = req.params.topicid;
    topicid = parseInt(topicid,10);

    const respond = await topic.getAllTopicById(topicid);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.use(authenticateJWT("Instructor"));

router.post('/',parameterCheckPost,async (req,res)=>{
    const newTopic = {
        title:          req.body.title,
        description:    req.body.description,
        courseId:       parseInt(req.body.courseId,10)
    }

    const respond = await topic.createNewTopic(newTopic);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.put('/:topicid',parameterCheckPut,async (req,res)=>{
    const updateTopic = {
        id:             parseInt(req.params.topicid,10),
        title:          req.body.title,
        description:    req.body.description,
        courseId:       parseInt(req.body.courseId,10)
    }

    const respond = await topic.updateTopicById(updateTopic);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.delete('/:id',async (req,res)=>{
    let id = req.params.id;
    id = parseInt(id,10);

    const respond = await topic.deleteTopicById(id);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

module.exports = router;