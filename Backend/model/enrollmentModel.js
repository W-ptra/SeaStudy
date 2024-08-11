const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEnrolledUsers(courseId) {
    if (!courseId) {
        throw new Error('courseId is required');
    }

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                enrollment: true,
            },
        });

        if (!course) {
            return {
                operation: false,
                status: 404,
                message: `Course with id: ${courseId} not found`,
            };
        }

        return {
            operation: true,
            status: 200,
            data: course,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation: false,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}

async function enrollCourse(courseId, userId) {
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

        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return {
                operation: false,
                status: 404,
                message: `User with id: ${userId} not found`,
            };
        }

        const updatedCourse = await prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return {
            operation: true,
            status: 200,
            message: `User with id: ${userId} enrolled in Course with id: ${courseId}`,
            data: updatedCourse,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation: false,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}

async function unenrollCourse(courseId, userId) {
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

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return {
                operation: false,
                status: 404,
                message: `User with id: ${userId} not found`,
            };
        }

        const updatedCourse = await prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });

        return {
            operation: true,
            status: 200,
            message: `User with id: ${userId} unenrolled from Course with id: ${courseId}`,
            data: updatedCourse,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation: false,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}   

module.exports = {
    getEnrolledUsers,
    enrollCourse,
    unenrollCourse
};