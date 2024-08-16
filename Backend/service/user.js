const {} = require("../model/courseModel");
const {
    getEnrolledCourses: getEnrolledCoursesDB,
    getCreatedCourses: getCreatedCoursesDB,
} = require("../model/courseModel");
const userModel = require("../model/userModel");

async function getUserById(id) {
    return await userModel.getUserById(id);
}

async function getEnrolledCourses(userId) {
    if (isNaN(userId))
        return {
            operation: false,
            status: 400,
            message: "Invalid userId",
        };

    return getEnrolledCoursesDB(userId);
}

async function getCreatedCourses(userId) {
    if (isNaN(userId))
        return {
            operation: false,
            status: 400,
            message: "Invalid userId",
        };

    return getCreatedCoursesDB(userId);
}

module.exports = { getUserById, getEnrolledCourses, getCreatedCourses };
