const assignmentModel = require("../../model/assignmentModel");

test("Test create new assignment",async ()=>{
    const assigment = {
        name:          "test assignment",
        description:   "test description",
        topicId:       6
    }

    const result = await assignmentModel.createNewAssignment(assigment);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Successfully created new Assignment with id:");
})

test("Test get assignment by id",async ()=>{
    const id = 6;

    const result = await assignmentModel.getAssignmentById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get assignment by id not found",async ()=>{
    const id = 9999;

    const result = await assignmentModel.getAssignmentById(id);
    console.log(result);
    expect(result.data).toBe(null);
})

test("Test update assignment",async ()=>{
    const assigment = {
        id:            8,
        name:          "test assignment",
        description:   "test description",
        topicId:       6
    }

    const result = await assignmentModel.updateAssignmentById(assigment);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully update Assignment with id:");
})

test("Test delete assignment",async ()=>{
    const id = 12;

    const result = await assignmentModel.deleteAssignmentById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully delete Assignment with id:");
})