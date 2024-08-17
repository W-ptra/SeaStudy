const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const sasToken = process.env.SAS_TOKEN;
const sasUrl = "https://seastudy.blob.core.windows.net/materials";
const containerName = "seastudyMaterialContainer";

async function uploadMaterialToBlobStorage(filePath,blobName){
    const blobServiceClient = new BlobServiceClient(`${sasUrl}?${sasToken}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(filePath);
    return `https://seastudy.blob.core.windows.net/materials/seastudyMaterialContainer/${blobName}`
}   

module.exports = { uploadMaterialToBlobStorage }