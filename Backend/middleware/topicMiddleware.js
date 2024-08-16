const {validateNumber} = require("../helper/validation");

function parameterCheckPost(req,res,next){
    const title = req.body.title;
    const description = req.body.description;
    const courseId = req.body.courseId;

    if(title === undefined || description === undefined || courseId === undefined)
        return res.status(400).json({message:"field title, description, or courseId can't empty"});

    const isNumber = validateNumber(courseId);
    console.log(isNumber);
    if(!isNumber.operation)
        return res.status(400).json({message:`field courseId ${isNumber.message}`});
    
    next();
}

function parameterCheckPut(req,res,next){
    const id = req.params.topicid
    const title = req.body.title;
    const description = req.body.description;
    const courseId = req.body.courseId;

    const isIdNumber = validateNumber(id);
    if(!isIdNumber.operation)
        return res.status(400).json({message:`Parameter Id ${isIdNumber.message}`});

    if(title === undefined || description === undefined || courseId === undefined)
        return res.status(400).json({message:"field title, description, or courseId can't empty"});

    const isCourseIdNumber = validateNumber(isCourseIdNumber);
    if(!isCourseIdNumber.operation)
        return res.status(400).json({message:`field courseId ${isCourseIdNumber.message}`});
    
    next()
}

module.exports = {parameterCheckPost,parameterCheckPut};