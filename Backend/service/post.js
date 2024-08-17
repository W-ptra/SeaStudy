const {
    createPost : createPostDB,
    getPostsByCourseId: getPostDB,
    deletePostById: deletePostDB,
} = require("../model/postModel");

async function createPost(postData) {
    if(postData.message === "") {
        return {
            operation: false,
            status: 400,
            message: "Message is required",
        };
    }

    return createPostDB(postData);
}

async function getPosts(postId) {
    return getPostDB(postId);
}

async function deletePost(postId) {
    return deletePostDB(postId);
}

module.exports = {
    createPost,
    getPosts,
    deletePost,
};
