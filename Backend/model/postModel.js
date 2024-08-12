const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (data) => {
    try {
        const post = await prisma.post.create({
            data,
        });
        return post;
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

// Get all posts
const getAllPosts = async () => {
    try {
        const posts = await prisma.post.findMany();
        return posts;
    } catch (error) {
        throw new Error(`Failed to get posts: ${error.message}`);
    }
};

const getCommentsByPostId = async (postId) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
        });
        return comments;
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

const getPostById = async (id) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });

        const comments = await getCommentsByPostId(id);
        post.comments = comments;

        return post;
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
        return post;
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
    getAllPosts,
    getPostById,
    getCommentsByPostId,
    updatePostById,
    deletePostById,
};