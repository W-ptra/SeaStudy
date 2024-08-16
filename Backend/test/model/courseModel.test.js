const courseModel = require("../../model/courseModel");

test("Test create new course",async ()=>{
    const course = {
        name:           "test course",
        description:    "test description",
        price:          2000,
        category:       "other",
        level:          "easy",
        userId:         2
    };

    const result = await courseModel.createNewCourse(course);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Sucessfully created new Course with id:");
})

test("Test get all course",async ()=>{
    const result = await courseModel.getAllCourses();

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get course by id",async ()=>{
    const id = 1;
    const result = await courseModel.getCourseById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
})

test("Test get all course by student id who enrollment it",async ()=>{
    const id = 2;
    const result = await courseModel.getEnrolledCourses(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get all course by instructor id who created it",async ()=>{
    const id = 9;
    const result = await courseModel.getCreatedCourses(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get all course by category, level, minRating, and maxRating",async ()=>{
    const filter = {
        category:   "other",
        level:      "easy",
        minRating:  0,
        maxRating:  5
    }

    const result = await courseModel.filterCourses(filter);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test update course",async ()=>{
    const course = {
        id:             1,
        name:           "test update course",
        description:    "test update description",
        price:          3000,
        category:       "other",
        level:          "easy",
        userId:         2
    };

    const result = await courseModel.updateCourse(course);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Sucessfully updated Course with id:");
})

test("Test delete course",async ()=>{
    const id = 3;

    const result = await courseModel.deleteCourse(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Sucessfully deleted Course with id:");
})