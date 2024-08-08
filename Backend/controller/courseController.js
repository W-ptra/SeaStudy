const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");

router.get('/',(req,res)=>{
  
});

router.get('/:courseId',(req,res)=>{
  
});

// Instructor role operations
router.use(authenticateJWT);

router.post('/add',(req,res)=>{
  
});

router.put('/update',(req,res)=>{

});

router.delete('/delete',(req,res)=>{

});

module.exports = router;