const {
    getAllCourses,
    getCourseById,
    createNewCourse,
    deleteCourse: deleteCourseDB,
    filterCourses,
    updateCourse,
} = require("../model/courseModel");
const { getTopicsByCourseId } = require("../model/topicModel");

async function getCourses() {
    return getAllCourses();
}

async function getCourseDetails(courseId) {
    if (isNaN(courseId))
        return {
            operation: false,
            status: 400,
            message: "Invalid courseId",
        };

    const course = await getCourseById(courseId);
    const topics = await getTopicsByCourseId(courseId);

    const operation = course.operation && topics.operation;

    if (operation)
        return {
            operation,
            status: 200,
            course: course.data,
            topics: topics.data,
        };

    return {
        operation,
        status: 400,
        message: course.message || topics.message,
    };
}

async function getFilteredCourses(filter) {
    if (
        filter.minRating < 0 ||
        filter.minRating > 5 ||
        filter.maxRating < 0 ||
        filter.maxRating > 5
    ) {
        return {
            status: 400,
            operation: false,
            message: "minRating and maxRating must be between 0 and 5",
        };
    }

    console.log({ filter });

    return filterCourses(filter);
}

async function postCourse(course) {
    if (course.userId == null)
        return { status: 400, operation: false, message: "userId is required" };

    if (course.name.length > 150)
        return {
            status: 400,
            operation: false,
            message: "name must be less than 150 characters",
        };

    return await createNewCourse(course);
}

async function updateCourseDetails(course) {
    if (course.userId == null)
        return { status: 400, operation: false, message: "userId is required" };

    if (course.name.length > 150)
        return {
            status: 400,
            operation: false,
            message: "name must be less than 150 characters",
        };

    return await updateCourse(course);
}

async function deleteCourse(courseId) {
    if (courseId == null)
        return { status: 400, operation: false, message: "courseId is required" };

    return await deleteCourseDB(courseId);
}

module.exports = {
    updateCourseDetails,
    postCourse,
    deleteCourse,
    getCourses,
    getCourseDetails,
    getFilteredCourses,
};
