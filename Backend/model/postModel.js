const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPostById = async (id) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });

        return {
            operation: true,
            status: 200,
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
}

const createPost = async (data) => {
    try {
        const post = await prisma.post.create({
            data: {
                userId: data.userId,
                courseId: data.courseId,
                message: data.message,
            },
        });

        return {
            operation: true,
            status: 201,
            message: "Post has been created",
            data: post,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.error(err);
        console.log("====== End of Error Log ======");

        return {
            operation: false,
            status: 500,
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
        const post = await getPostById(id);

        if(post.data === null) 
            return {
                operation: false,
                status: 404,
                message: "Post does not exist",
            };

        await prisma.post.delete({
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
            status: 500,
            message: "Internal Server Error",
        };
    }
};

module.exports = {
    createPost,
    getPostsByCourseId,
    deletePostById,
};