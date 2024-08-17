const postModel = require("../../model/postModel");

test("Test create new post",async ()=>{
    const post = {
        userId:     10,
        courseId:   16,
        message:    "test message",
    };

    const result = await postModel.createPost(post);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).not.toBe(null);
    expect(result.message).toContain("Post has been created");
})

test("Test get post by courseId",async ()=>{
    const id = 10;

    const result = await postModel.getPostsByCourseId(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get post by id",async ()=>{
    const id = 6   ;

    const result = await postModel.getPostById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test delete post",async ()=>{
    const id = 10   ;

    const result = await postModel.deletePostById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain(`Post with id ${id} has been deleted`);
})
