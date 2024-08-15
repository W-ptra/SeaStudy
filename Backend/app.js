const enrollmentController = require("./controller/enrollmentController");
const assignmentController = require("./controller/assignmentController");
const submissionController = require("./controller/submissionController");
const completionController = require("./controller/completionController");
const materialController = require("./controller/materialController");
const paymentController = require("./controller/paymentController");
const reviewController = require("./controller/reviewController");
const courseController = require("./controller/courseController");
const topicController = require("./controller/topicController");
const userController = require("./controller/userController");
const authController = require("./controller/authController");
const postController = require("./controller/postController");
const { sanitize } = require("./middleware/sanitize");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.static('./public'));
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(sanitize);
app.use("/api/assignment", assignmentController);
app.use("/api/completion", completionController);
app.use("/api/submission", submissionController);
app.use("/api/enrollment", enrollmentController);
app.use("/api/material", materialController);
app.use("/api/payment", paymentController);
app.use("/api/course", courseController);
app.use("/api/review", reviewController);
app.use("/api/topic", topicController);
app.use("/api/auth", authController);
app.use("/api/user", userController);
app.use("/api/post", postController);

app.use((req, res) => {
    res.status(404).json({message:"404 Not Found"});
});

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`listening to port ${process.env.PORT}`);
});
