const submissionModel = require("../../model/submissionModel");

test("Test create new submission",async ()=>{
    const submission = {
        score:           67.5,
        isGraded:        false,
        content:         "test content",
        assignmentId:    8,
        userId:          10
    }

    const result = await submissionModel.createNewSubmission(submission);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Successfully created new Submission with id:");
})

test("Test get all submission by assignment id",async ()=>{
    const id = 8;

    const result = await submissionModel.getAllSubmissionByAssignmentId(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get all submission by assignment id but not found",async ()=>{
    const id = 9999;

    const result = await submissionModel.getAllSubmissionByAssignmentId(id);

    const expectedResult = [];
    expect(result.data).toEqual(expectedResult);
})

test("Test get submission by user id",async ()=>{
    const id = 10;

    const result = await submissionModel.getSubmissionByUserId(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get submission by user id but not found",async ()=>{
    const id = 9999;

    const result = await submissionModel.getSubmissionByUserId(id);

    const expectedResult = [];
    expect(result.data).toEqual(expectedResult);
})

test("Test get submission by id",async ()=>{
    const id = 6;

    const result = await submissionModel.getSubmissionById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get submission by id but not found",async ()=>{
    const id = 9999;

    const result = await submissionModel.getSubmissionById(id);

    expect(result.data).toBe(null);
})

test("Test update submission",async ()=>{
    const submission = {
        id:              3,
        score:           67.5,
        isGraded:        false,
        content:         "test update content",
        assignmentId:    8,
        userId:          10
    }

    const result = await submissionModel.updateSubmissionById(submission);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully update Submission with id:");
})