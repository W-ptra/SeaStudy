const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.EMAIL_KEY);

async function coursePurchasedNotification(instructor,student,course){
    console.log(instructor);
    const text = `
        Dear ${instructor.name},

        We are excited to inform you that your course, ${course.name}, has just been purchased by a new student!

        Purchase Details:
        - Course Name:   ${course.name}
        - Student Name:  ${student.name}
        - Course price:  Rp.${course.price}
        - Purchase Date: ${new Date()}

        Congratulations on your new student, and thank you for being a valued Instructor of SEAstudy!
    `
    const email = {
        from:       `noreply@wisnuputra.xyz`,
        to:         `${instructor.email}`,
        subject:    `Good News! A student just purchased your course.`,
        Headers:    `Good News! A student just purchased your course.`,
        text
    }

    const {data,error} = await resend.emails.send(email);

    if(error){
        console.log(error);
        return
    }
}

async function assignmentNotification(instructor,student,assignment){
    const text = `
        Dear ${instructor.name},

        We are pleased to inform you that a new assignment has been submitted by one of your students.

        Submission Details:
        - Assignment Id:   ${assignment.id}
        - Student Name:    ${student.name}
        - Submission Date: ${new Date()}

        Thank you for your dedication and hard work in guiding our students!
    `
    const email = {
        from:       `noreply@wisnuputra.xyz`,
        to:         `${instructor.email}`,
        subject:    `New Assignment Submission Notification`,
        Headers:    `New Assignment Submission Notification`,
        text
    }

    const {data,error} = await resend.emails.send(email);

    if(error){
        console.log(error);
        return
    }
}

module.exports = {coursePurchasedNotification,assignmentNotification};