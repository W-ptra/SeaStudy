const topicModel = require("../../model/topicModel");

test("Test create new topic",async ()=>{
    const topic = {
        title:          "test topic",
        description:    "test description",
        courseId:       10
    }

    const result = await topicModel.createNewTopic(topic);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Successfully created new Topic with id:");
})

test("Test get all topic by course id",async ()=>{
    const id = 10;

    const result = await topicModel.getAllTopicByCourseId(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get all topic by course id but not found",async ()=>{
    const id = 9999;

    const result = await topicModel.getAllTopicByCourseId(id);
    const expected = []
    expect(result.data).toEqual(expected)
})

test("Test get topic id",async ()=>{
    const id = 4;

    const result = await topicModel.getTopicById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get topic by id but not found",async ()=>{
    const id = 9999;

    const result = await topicModel.getTopicById(id);

    expect(result.data).toBe(null);
})

test("Test get topic by id non join",async ()=>{
    const id = 10;

    const result = await topicModel.getTopicByIdNonJoin(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get topic by id non join but not found",async ()=>{
    const id = 999;

    const result = await topicModel.getTopicByIdNonJoin(id);

    expect(result.data).toBe(null);
})

test("Test update topic",async ()=>{
    const data = {
        id:             12,
        title:          "test topic title",
        description:    "test topic description",
        courseId:       14
    }

    const result = await topicModel.updateTopicById(data);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
})

test("Test delete topic",async ()=>{
    const id = 10;

    const result = await topicModel.deleteTopicById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
})