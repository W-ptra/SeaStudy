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
    return await material.updateMaterialById(updateMaterial);
}

async function deleteMaterial(id){
    return await material.deleteMaterialById(id);
}

module.exports = {uploadMaterial,createNewMaterial,updateMaterial,deleteMaterial}