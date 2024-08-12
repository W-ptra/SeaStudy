const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');

// GET all reviews
router.get('/', (req, res) => {
    // Your code to fetch all reviews from the database
});

// GET a specific review
router.get('/:id', (req, res) => {
    // Your code to fetch a specific review from the database based on the provided ID
});

router.use(authenticateJWT("User"));
// CREATE a new review
router.post('/', (req, res) => {
    // Your code to create a new review in the database based on the data provided in the request body
});

// UPDATE an existing review
router.put('/:id', (req, res) => {
    // Your code to update an existing review in the database based on the provided ID and data in the request body
});

// DELETE a review
router.delete('/:id', (req, res) => {
    // Your code to delete a review from the database based on the provided ID
});

module.exports = router;