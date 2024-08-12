const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (data) => {
    try {
        const post = await prisma.post.create({
            data,
        });

        return {
            operation: true,
            status: 201,
            data: post,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
};

const getPostsByCourseId = async (courseId) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                courseId,
            },
        });

        return {
            operation: true,
            status: 200,
            data: posts,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
};

const deletePostById = async (id) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id,
            },
        });

        return {
            operation: true,
            status: 200,
            message: `Post with id ${id} has been deleted`,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
};

module.exports = {
    createPost,
    getPostsByCourseId,
    getPostById,
    updatePostById,
    deletePostById,
};