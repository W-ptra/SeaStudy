const {getUserById,updateUserSaldo} = require("../model/userModel");
const {getCourseById} = require("../model/courseModel");
const {enrollCourse} = require("../model/enrollmentModel");

async function topUp(userId,amount){
    const user = await getUserById(userId)
    amount = BigInt(amount) + user.data.credit;
    return await updateUserSaldo(userId,amount);
}

async function purchaseCourse(userId,courseId){
    const course = await getCourseById(courseId);

    if(course.data === null)
        return {
            operaration:    false,
            message:        `course with id ${courseId} was not found`
        }

    const user = await getUserById(userId);
    const coursePrice = course.data.price;
    const userCredit = user.data.credit;
    
    if(userCredit < coursePrice)
        return {
            operaration:    false,
            message:        `Credit is insufficient`
        }
    const remainCredit = BigInt(userCredit) - BigInt(coursePrice);

    await updateUserSaldo(userId,remainCredit);
    console.log(courseId, " ", userId)
    await enrollCourse(courseId,userId);

    return {
        operaration:    true,
        message:        `Successfully purchase course ${course.data.name}`
    }
}

async function test(){
    await topUp(2,5000);
    const result = await purchaseCourse(2,10);
    console.log(result);
}
test()

module.exports = {topUp,purchaseCourse}