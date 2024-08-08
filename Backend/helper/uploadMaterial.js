const { BlobServiceClient } = require("@azure/storage-blob");
const { v4:uuidv4 } = require("uuid");
require("dotenv").config();

const sasToken = process.env.SAS_TOKEN;
const sasUrl = "https://seastudy.blob.core.windows.net/materials";
const containerName = "seastudyMaterialContainer";

async function uploadMaterialToBlobStorage(filePath,extension){
    const blobServiceClient = new BlobServiceClient(`${sasUrl}?${sasToken}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = `${uuidv4()}.${extension}`; // generate random string using uuidv4 for file name
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(filePath);
    return `https://seastudy.blob.core.windows.net/materials/seastudyMaterialContainer/${blobName}`
}   

module.exports = {uploadMaterialToBlobStorage}