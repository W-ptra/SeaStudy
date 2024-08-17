const {authenticateJWT} = require("../middleware/auth");
const material = require("../service/material");
const { v4: uuidv4} = require("uuid");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');

router.use(authenticateJWT("Instructor"));

router.post('/',async (req,res)=>{
    const newMaterial = {
        name:       req.body.name,
        type:       req.body.type,
        link:       req.body.link,
        topicId:    parseInt(req.body.topicId,10)
    }
    const respond = await material.createNewMaterial(newMaterial);

    if (!respond.operation)
        return res.status(500).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.put('/:materialid',async (req,res)=>{
    const newMaterial = {
        id:         parseInt(req.params.materialid,10),
        name:       req.body.name,
        type:       req.body.type,
        link:       req.body.link,
        topicId:    parseInt(req.body.topicId,10)
    }
    const respond = await material.updateMaterial(newMaterial);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

router.delete('/:materialid',async (req,res)=>{
    let id = parseInt(req.params.materialid,10)

    const respond = await material.deleteMaterial(id);

    if (!respond.operation)
        return res.status(respond.status).json({ message: respond.message });

    return res.status(200).json(respond);
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'materials')); 
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    
    const uniqueName = uuidv4() + fileExtension;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('materials'), async (req, res) => {
    try {
        const result = await material.uploadMaterial(req.file.filename)
        const respond = {
            url: result
        }
        //console.log(respond); uncomment for enable logging
        return res.status(200).json(respond);
    } catch (error) {
        
        return res.status(400).send({message:'Error uploading File'});
    }
});

module.exports = router;