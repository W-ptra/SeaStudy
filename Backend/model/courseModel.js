const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function createNewCourse(newCourse) {
    try {
        const data = {
            name: newCourse.name,
            description: newCourse.description,
            price: newCourse.price,
            category: newCourse.category,
            level: newCourse.level,
            instructor: newCourse.instructor,
			userId: newCourse.userId
        };
        
        const course = await prisma.course.create({ data });
        
        return {
            operation: true,
            status: 201,
            message: `Sucessfully created new Course with id: ${course.id}`,
            payload: course,
        };
    } catch (err) {
        return {
            operation: false,
            message: err,
        };
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = { createNewCourse };