const {uploadMaterialToBlobStorage} = require("../helper/uploadMaterial");
const material = require("../model/materialModel");
const fs = require('fs');

async function uploadMaterial(material){
    const path = "./public/materials/"
    const upload = await uploadMaterialToBlobStorage(path + material,material);
    fs.unlink(path + material);
    return upload 
}

async function createNewMaterial(newMaterial){
    return await material.createNewMaterial(newMaterial);
}

async function updateMaterial(updateMaterial){
    const isExist = await material.getMaterialById(updateMaterial.id);

    if(isExist.data === null)
        return {
            operation:  false,
            status:     404,
            message:    `Material with id ${updateMaterial.id} was not found`
        }

    return await material.updateMaterialById(updateMaterial);
}

async function deleteMaterial(id){
    const isExist = await material.getMaterialById(id);

    if(isExist.data === null)
        return {
            operation:  false,
            status:     404,
            message:    `Material with id ${id} was not found`
        }

    return await material.deleteMaterialById(id);
}

module.exports = {uploadMaterial,createNewMaterial,updateMaterial,deleteMaterial}