const { getAllCourses, getCourseById, createNewCourse, filterCourses } = require("../model/courseModel");

async function getCourses() {
    return getAllCourses();
}

async function getCourseDetails(courseId) {
    console.log("Course id: " + courseId);
    
    if (isNaN(courseId))
        return res.status(400).json({ message: "Invalid courseId" });

    // TODO: get topics for the course

    return getCourseById(courseId);
}

async function getFilteredCourses(filter) {
    if(filter.minRating < 0 || filter.minRating > 5 || filter.maxRating < 0 || filter.maxRating > 5) {
        return { status: 400, operation: false, message:"minRating and maxRating must be between 0 and 5" };
    }

    console.log({filter});

    return filterCourses(filter);
}

async function postCourse(course) {
    if(course.userId == null)
        return { status: 400, operation: false, message:"userId is required"};

    if(course.name.length > 150)
        return { status: 400, operation: false, message:"name must be less than 150 characters"}; 

    return await createNewCourse(course);
}

module.exports = { postCourse, getCourses, getCourseDetails, getFilteredCourses };