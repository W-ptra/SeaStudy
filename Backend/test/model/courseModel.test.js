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
    const id = 10;
    const result = await courseModel.getCourseById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
})