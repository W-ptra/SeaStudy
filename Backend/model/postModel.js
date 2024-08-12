const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new post
const createPost = async (data) => {
    try {
        const post = await prisma.post.create({
            data,
        });
        return post;
    } catch (error) {
        throw new Error(`Failed to create post: ${error.message}`);
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

// Get a post by ID
const getPostById = async (id) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });
        return post;
    } catch (error) {
        throw new Error(`Failed to get post: ${error.message}`);
    }
};

// Update a post by ID
const updatePostById = async (id, data) => {
    try {
        const post = await prisma.post.update({
            where: {
                id,
            },
            data,
        });
        return post;
    } catch (error) {
        throw new Error(`Failed to update post: ${error.message}`);
    }
};

// Delete a post by ID
const deletePostById = async (id) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id,
            },
        });
        return post;
    } catch (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
};