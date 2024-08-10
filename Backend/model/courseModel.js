const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TODO: hide stack trace in production
async function getAllCourses() {
    try {
        const courses = await prisma.course.findMany();

        const coursesWithBigIntAsString = courses.map((course) => {
            return {
                ...course,
                price: course.price.toString(),
            };
        });
        console.log(coursesWithBigIntAsString);

        return {
            operation: true,
            status: 200,
            data: coursesWithBigIntAsString,
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

        return {
            operation: true,
            status: 200,
            data: courseWithBigIntAsString,
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

async function filterCourses({ category, level, minRating, maxRating }) {
    try {
        const whereClause = {};

        if (category) {
            whereClause.category = category;
        }

        if (level) {
            whereClause.level = level;
        }

        if (minRating !== undefined && maxRating !== undefined) {
            whereClause.avgRating = {
                gte: minRating,
                lte: maxRating,
            };
        } else if (minRating !== undefined) {
            whereClause.avgRating = {
                gte: minRating,
            };
        } else if (maxRating !== undefined) {
            whereClause.avgRating = {
                lte: maxRating,
            };
        }
        console.log({ whereClause });

        const courses = await prisma.course.findMany({
            where: whereClause,
        });

        const coursesWithBigIntAsString = courses.map((course) => {
            return {
                ...course,
                price: course.price.toString(),
            };
        });

        return {
            operation: true,
            status: 200,
            data: coursesWithBigIntAsString,
        };
    } catch (err) {
        console.error(err);
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
            userId: newCourse.userId,
        };

        const course = await prisma.course.create({ data });

        return {
            operation: true,
            status: 201,
            message: `Sucessfully created new Course with id: ${course.id}`,
            data: course,
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

async function updateCourse(updatedCourse) {
    try {
        const existingCourse = await getCourseById(updatedCourse.id);

        const data = {
            name: updatedCourse.name ?? existingCourse.data.name,
            description: updatedCourse.description ?? existingCourse.data.description,
            price: updatedCourse.price ?? existingCourse.data.price,
            category: updatedCourse.category ?? existingCourse.data.category,
            level: updatedCourse.level ?? existingCourse.data.level
        };

        const course = await prisma.course.update({
            where: {
                id: updatedCourse.id,
            },
            data,
        });

        return {
            operation: true,
            status: 200,
            message: `Sucessfully updated Course with id: ${course.id}`,
            data: course,
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

async function deleteCourse(courseId) {
    try {
        const course = await prisma.course.delete({
            where: {
                id: courseId,
            },
        });

        return {
            operation: true,
            status: 200,
            message: `Sucessfully deleted Course with id: ${course.id}`,
            data: course,
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

module.exports = {
    createNewCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    filterCourses,
};
