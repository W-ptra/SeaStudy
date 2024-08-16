const assignmentService = require('../../service/assignment');

test("Test create new assignment",async ()=>{
    const assigment = {
        name:          "test assignment",
        description:   "test description",
        topicId:       1
    }

    const result = await assignmentService.createNewAssignment(assigment);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Successfully created new Assignment with id:");
});

test("Test update assignment", async () => {
    const updatedAssignment = {
        id: 1,
        name: "updated assignment",
        description: "updated description",
        topicId: 6
    };

    const result = await assignmentService.updateAssignment(updatedAssignment);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully updated Assignment with id:");
});