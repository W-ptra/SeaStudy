const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');

// Create a new post
router.post('/', (req, res) => {
    // Logic to create a new post
});

// Read all posts
router.get('/', (req, res) => {
    // Logic to fetch all posts
});

// Read a specific post
router.get('/:id', (req, res) => {
    // Logic to fetch a specific post by ID
});

router.use(authenticateJWT("User"));
// Update a post
router.put('/:id', (req, res) => {
    // Logic to update a specific post by ID
});

// Delete a post
router.delete('/:id', (req, res) => {
    // Logic to delete a specific post by ID
});

module.exports = router;