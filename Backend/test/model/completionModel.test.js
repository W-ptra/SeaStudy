const {createNewCompletion} = require("../../model/completionModel");

test("Test create new completion",async ()=>{
    const completion = {
        topicId:    5,
        userId:     2
    };

    const result = await createNewCompletion(completion);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Successfully created new Completion with id:");
})