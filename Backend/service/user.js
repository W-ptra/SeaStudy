const {} = require("../model/courseModel");
const {getEnrollmentsByUserId} = require("../model/enrollmentModel");
const userModel = require("../model/userModel");

async function getUserById(id){
    return await userModel.getUserById(id);
}

// async function getCourseByUserId(id,role){

//     // instructor get semua course yg udh di bikin

//     // user get semua course yang udh di beli
// }

module.exports = {getUserById}