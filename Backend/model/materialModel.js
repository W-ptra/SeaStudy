const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function createNewMaterial(newMaterial){
    try{
        const data = {
            name:           newMaterial.name,
            type:           newMaterial.type,
            link:           newMaterial.link,
            topic:         { connect:{id: newMaterial.topicId} },
            
        }
        const topic = await prisma.material.create({ data });
        return {
            operation:  true,
            message:    `Sucessfully created new Material with id: ${topic.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Interval Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getAllMaterialByTopicId(topicId){
    try{
        const where = { topicId }
        const allMaterial = await prisma.material.findMany({where})
        return {
            operation:  true,
            data:       allMaterial
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Interval Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getMaterialById(id){
    try{
        const where = { id }
        const material = await prisma.material.findUnique({where})
        return {
            operation:  true,
            data:       material
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Interval Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function updateMaterialById(updatedMaterial){
    try{
        const where = { id:updatedMaterial.id }
        const data = {
            name:           updatedMaterial.name,
            type:           updatedMaterial.type,
            link:           updatedMaterial.link,
            topicId:        updatedMaterial.topicId
        }
        const updating = await prisma.material.update({where,data})
        return {
            operation:  true,
            message:    `Sucessfully updated Material with id: ${updating.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Interval Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function deleteMaterialById(id){
    try{
        await prisma.material.delete({where:{id}})
        return {
            operation:  true,
            message:    `Sucessfully delete Material with id: ${id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Interval Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    createNewMaterial,
    getAllMaterialByTopicId,
    getMaterialById,
    updateMaterialById,
    deleteMaterialById
}