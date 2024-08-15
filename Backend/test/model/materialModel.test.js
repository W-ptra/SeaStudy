const materialModel = require("../../model/materialModel");

test("Test create new material",async ()=>{
    const material = {
        name:           "material test",
        type:           "ppt",
        link:           "test link",
        topicId:        12
    }

    const result = await materialModel.createNewMaterial(material);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.message).toContain("Successfully created new Material with id:");
})

test("Test get all material by topic id",async ()=>{
    const id = 4;

    const result = await materialModel.getAllMaterialByTopicId(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get all material by topic id but not found",async ()=>{
    const id = 9999;

    const result = await materialModel.getAllMaterialByTopicId(id);
    const expectedResult = [];
    expect(result.data).toEqual(expectedResult);
})

test("Test get material by id",async ()=>{
    const id = 8;

    const result = await materialModel.getMaterialById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get material by id but not found",async ()=>{
    const id = 9999;

    const result = await materialModel.getMaterialById(id);

    expect(result.data).toBe(null);
})

test("Test update material",async ()=>{
    const data = {
        id:             8,
        name:           "test update name",
        type:           "video",
        link:           "test update link",
        topicId:        12
    }

    const result = await materialModel.updateMaterialById(data);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully updated Material with id:");
})

test("Test delete material",async ()=>{
    const id = 13;

    const result = await materialModel.deleteMaterialById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully delete Material with id:");
})