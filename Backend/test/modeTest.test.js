const { createNewUser, getUserByEmail } = require('../model/userModel');
// import course
const topic = require("../model/topicModel");
const material = require("../model/materialModel");

//  User model 
// test("insert new user into user table",async ()=>{
//     const newUser = {
//         email:          "test@email.com",
//         name:           "test user",
//         password:       "test password",
//     }

//     const result = await createNewUser(newUser);
//     const resultShouldBe = {
//         operation:  true,
//         message:    "Sucessfully created new User with id: 1"
//     }
//     expect(result).toEqual(resultShouldBe)
// })

// test("get user with email",async ()=>{
//     const email = "test@email.com";
//     const result = await getUserByEmail(email);
//     const resultShouldBe = {
//         operation: true,
//         data: {
//           id: 1,
//           email:        "test@email.com",
//           name:         "test user",
//           password:     "test password",
//           role:         "User",
//           credit: 0n,
//           createdAt: new Date('2024-08-08T12:00:34.563Z'),
//           updatedAt: new Date('2024-08-08T12:00:34.563Z')
//         }
//     }
//     expect(result).toEqual(resultShouldBe)
// })

// Course model

// Topic model

// test("insert new topic into topic table",async ()=>{
//     const newTopic = {
//         title:          "Test topic",
//         description:    "Test description",
//         course:         { connect:{id: 1} }
        
//     }

//     const result = await topic.createNewTopic(newTopic);
//     const resultShouldBe = {
//         operation:  true,
//         message:    "Sucessfully created new Topic with id: 3"
//     }
//     expect(result).toEqual(resultShouldBe)
// })

// Material model

// test("insert new material into material table",async ()=>{
//     const newMaterial = {
//         name:           "Test material",
//         type:           "ppt",
//         link:           "Test link",
//         topicId:          1
        
//     }

//     const result = await material.createNewMaterial(newMaterial);
//     expect(result.operation).toBe(true)
// })

// test("get all material by topic id 1",async ()=>{
//     const result = await material.getAllMaterialByTopicId(1);
//     expect(result.operation).toBe(true)
// })

// test("get material by id 1",async ()=>{
//     const result = await material.getMaterialById(1);
//     expect(result.operation).toBe(true)
// })

// test("update material by id 1",async ()=>{
//     const updateMaterial = {
//         id:             1,
//         name:           "Test update material",
//         type:           "ppt",
//         link:           "Test update link",
//         topicId:          1
        
//     }

//     const result = await material.updateMaterialById(updateMaterial);
//     const resultShouldBe = {
//         operation:  true,
//         message:    "Sucessfully updated material with id: 1"
//     }
//     expect(result).toEqual(resultShouldBe)
// })

// test("delete material by id 1",async ()=>{
//     const result = await material.deleteMaterialById(1);
//     const resultShouldBe = {
//         operation:  true,
//         message:    "Sucessfully delete material with id: 1"
//     }
//     expect(result).toEqual(resultShouldBe)
// })