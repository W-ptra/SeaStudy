const {
    getEnrolledUsers: getEnrolledUsersDB,
    enrollCourse: enrollCourseDB,
    unenrollCourse: unenrollCourseDB,
} = require("../model/enrollmentModel");

async function getEnrolledUsers(courseId) {
    if (courseId == null)
        return {
            status: 400,
            operation: false,
            message: "courseId is required",
        };

    return await getEnrolledUsersDB(courseId);
}

async function enrollCourse(courseId, userId) {
    if (courseId == null || userId == null)
        return {
            status: 400,
            operation: false,
            message: "courseId and userId is required",
        };

    return await enrollCourseDB(courseId, userId);
}

async function unenrollCourse(courseId, userId) {
    if (courseId == null || userId == null)
        return {
            status: 400,
            operation: false,
            message: "courseId and userId is required",
        };

    return await unenrollCourseDB(courseId, userId);
}

module.exports = {
    getEnrolledUsers,
    enrollCourse,
    unenrollCourse,
};