const {enrollCourse,getEnrollmentsByUserId} = require("../model/enrollmentModel");
const {coursePurchasedNotification} = require("../helper/email");
const {getUserById,updateUserSaldo} = require("../model/userModel");
const {getCourseById} = require("../model/courseModel");

async function topUp(userId,amount){
    const user = await getUserById(userId)
    amount = BigInt(amount) + user.data.credit;
    return await updateUserSaldo(userId,amount);
}

async function purchaseCourse(userId,courseId){
    const course = await getCourseById(courseId);

    if(course.data === null)
        return {
            operation:    false,
            status:         404,
            message:        `course with id ${courseId} was not found`
        }

    // const isEnroll = await getEnrollmentsByUserId(userId,courseId);
    // console.log(isEnroll);
    // if(isEnroll.data !== null)
    //     return {
    //         operation:    false,
    //         message:        `User with with ${userId} already enrolled on course with id ${courseId}`
    //     }

    const user = await getUserById(userId);
    const coursePrice = course.data.price;
    const userCredit = user.data.credit;
    
    if(userCredit < coursePrice)
        return {
            operation:    false,
            status:         400,
            message:        `Credit is insufficient`
        }

    const remainCredit = BigInt(userCredit) - BigInt(coursePrice);
    await updateUserSaldo(userId,remainCredit);

    const result = await enrollCourse(courseId,userId);
    if (!result.operation)
        return result;
    
    const instructor = await getUserById(course.data.userId);
    const instructorCredit = BigInt(instructor.data.credit) + BigInt(coursePrice);
    await updateUserSaldo(instructor.data.id,instructorCredit);

    //coursePurchasedNotification(instructor.data, user.data, course.data); 
    return {
        operation:    true,
        message:        `Successfully purchase course ${course.data.name}`
    }
}

module.exports = {topUp,purchaseCourse}