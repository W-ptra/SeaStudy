const userModel = require("../model/userModel");
const {} = require("../model/courseModel");

async function getUserById(id){
    return await userModel.getUserById(id);
}

// async function getCourseByUserId(id){
//     // instructor get semua course yg udh di bikin

//     // user get semua course yang udh di beli
// }

module.exports = {getUserById}