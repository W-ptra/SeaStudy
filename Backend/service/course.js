import { createNewCourse } from "../model/courseModel";

async function postCourse(course) {
    return await createNewCourse(course);
}

module.exports = { postCourse };