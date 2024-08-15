//const { getCache,createCache } = require("./cache");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPostById = async (id) => {
    //const cacheKey = `get post by id ${id}`;
    try {
        // const cache = await getCache(cacheKey);
        // if(cache !== null)
        //     return{
        //         operation:  true,
        //         status:     200,
        //         data:       cache
        //     }

        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });

        //createCache(cacheKey,post);
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
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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
    //const cacheKey = `get post by course id ${courseId}`;
    try {
        // const cache = await getCache(cacheKey);
        // if(cache !== null)
        //     return{
        //         operation:  true,
        //         status:     200,
        //         data:       cache
        //     }

        const posts = await prisma.post.findMany({
            where: {
                courseId,
            },
        });

        //createCache(cacheKey,posts);
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
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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
    getPostById,
    getPostsByCourseId,
    deletePostById,
};