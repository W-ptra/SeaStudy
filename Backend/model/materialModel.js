const { getCache,createCache } = require("./cache");
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
        const material = await prisma.material.create({ data });
        return {
            operation:  true,
            status:     201,
            message:    `Successfully created new Material with id: ${material.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getAllMaterialByTopicId(topicId){
    const cacheKey = `get all material by topic id ${topicId}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { topicId }
        const allMaterial = await prisma.material.findMany({where})
        createCache(cacheKey,allMaterial);
        return {
            operation:  true,
            status:     200,
            data:       allMaterial
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getMaterialById(id){
    const cacheKey = `get material by id ${id}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { id }
        const material = await prisma.material.findUnique({where})
        createCache(cacheKey,material);
        return {
            operation:  true,
            status:     200,
            data:       material
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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
            status:     200,
            message:    `Successfully updated Material with id: ${updating.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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
            status:     200,
            message:    `Successfully delete Material with id: ${id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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