const { PrismaClient } = require("@prisma/client");
const { getCourseById } = require("./courseModel");
const { getUserById } = require("./userModel");
const prisma = new PrismaClient();

async function getEnrollmentsByCourseId(courseId) {
    try {
        const enrollments = await prisma.enrollment.findMany({
            where: {
                courseId,
            },
        });

        const enrollmentData = enrollments.map((enroll) => ({
            userId: enroll.userId,
            courseId: enroll.courseId,
        }));
        console.log(enrollmentData);

        return {
            operation: true,
            status: 200,
            data: enrollmentData,
        };
    } catch (err) {
        console.error("Error fetching enrollments:", err);

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}

async function enrollCourse(courseId, userId) {
    try {
        const course = await getCourseById(courseId);

        if (!course.data) {
            return {
                operation: false,
                status: 404,
                message: `Course with id: ${courseId} not found`,
            };
        }

        const user = await getUserById(userId);

        if (!user.data) {
            return {
                operation: false,
                status: 404,
                message: `User with id: ${userId} not found`,
            };
        }

        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        if (enrollment) {
            return {
                operation: false,
                status: 404,
                message: `User with id: ${userId} already enrolled in Course with id: ${courseId}`,
            };
        }

        const addedEnrollment = await prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });

        return {
            operation: true,
            status: 200,
            message: `User with id: ${userId} enrolled in Course with id: ${courseId}`,
            data: addedEnrollment,
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
        const course = await getCourseById(courseId);

        if (!course.data) {
            return {
                operation: false,
                status: 404,
                message: `Course with id: ${courseId} not found`,
            };
        }

        const user = await getUserById(userId);

        if (!user.data) {
            return {
                operation: false,
                status: 404,
                message: `User with id: ${userId} not found`,
            };
        }

        await prisma.enrollment.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        return {
            operation: true,
            status: 200,
            message: `User with id: ${userId} unenrolled from Course with id: ${courseId}`,
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
    getEnrollmentsByCourseId,
    enrollCourse,
    unenrollCourse,
};