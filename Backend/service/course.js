const { createNewCourse, getAllCourses } = require("../model/courseModel");

async function getCourses() {
    return getAllCourses();
}

async function postCourse(course) {
    if(course.userId == null)
        return { status: 400, operation: false, message:"userId is required"};

    if(course.name.length > 150)
        return { status: 400, operation: false, message:"name must be less than 150 characters"}; 

    return await createNewCourse(course);
}

module.exports = { postCourse, getCourses };