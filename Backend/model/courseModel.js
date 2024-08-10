const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllCourses() {
    try {
        const courses = await prisma.course.findMany();

        const coursesWithBigIntAsString = courses.map((course) => {
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
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}

async function getCourseById(courseId) {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });

        if (!course) {
            return {
                operation: false,
                status: 404,
                message: `Course with id: ${courseId} not found`,
            };
        }

        const courseWithBigIntAsString = {
            ...course,
            price: course.price.toString(),
        };
        console.log(courseWithBigIntAsString);

        return {
            operation: true,
            status: 200,
            payload: courseWithBigIntAsString,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
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
            userId: newCourse.userId,
        };

        const course = await prisma.course.create({ data });

        return {
            operation: true,
            status: 201,
            message: `Successfully created new Course with id: ${course.id}`,
            payload: course,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = { createNewCourse, getAllCourses, getCourseById };
