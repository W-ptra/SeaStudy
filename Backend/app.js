const apiController = require('./controller/apiController');
const authController = require('./controller/authController');
const courseController = require('./controller/courseController');
const topicController = require('./controller/topicController');
const materialController = require('./controller/materialController');
const sanitize = require('./middleware/sanitize');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors({origin:"*"}))
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(sanitize);
app.use('/api/auth',authController);
app.use('/api/course',courseController);
app.use('/api/topic',topicController);
app.use('/api/material',materialController);
app.use('/api',apiController);

app.get('/',(req,res)=>{
    res.send("test 123");
});

app.use((req,res)=>{
    res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`listening to port ${process.env.PORT}`);
})