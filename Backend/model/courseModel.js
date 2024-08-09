const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function getAllCourses() {
    try {
        const courses = await prisma.course.findMany();
        console.log(courses);

        const coursesWithBigIntAsString = courses.map(course => {
            return {
                ...course,
                price: course.price.toString(),
            };
        });
        
        return {
            operation: true,
            status: 200,
            payload: coursesWithBigIntAsString,
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

async function createNewCourse(newCourse) {
    try {
        const data = {
            name: newCourse.name,
            description: newCourse.description,
            price: newCourse.price,
            category: newCourse.category,
            level: newCourse.level,
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

module.exports = { createNewCourse, getAllCourses };