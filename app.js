<<<<<<< HEAD
const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const studentRoute = require("./routes/student");
const mentorRoute = require("./routes/mentor");
const assignMentortoStudent = require("./routes/assignMentortoStudent");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// middleware to allow cross-origin requests from any domain
app.use(cors({
    origin: '*',
    credentials: true
}));

// middleware to parse the cookies
app.use(cookieParser());

// middleware to parse the request body
app.use(express.json());

// middleware to log the request
app.use(morgan('dev'));

// defining the endpoints or routes
app.use('/users', userRouter);
app.use('/companies', companyRouter);
app.use('/jobs', jobRouter);


app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignmentor", assignMentortoStudent);
// export the app module
=======
const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const studentRoute = require("./routes/student");
const mentorRoute = require("./routes/mentor");
const assignMentortoStudent = require("./routes/assignMentortoStudent");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// middleware to allow cross-origin requests from any domain
app.use(cors({
    origin: '*',
    credentials: true
}));

// middleware to parse the cookies
app.use(cookieParser());

// middleware to parse the request body
app.use(express.json());

// middleware to log the request
app.use(morgan('dev'));

// defining the endpoints or routes
app.use('/users', userRouter);
app.use('/companies', companyRouter);
app.use('/jobs', jobRouter);


app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignmentor", assignMentortoStudent);
// export the app module
>>>>>>> e813d22dfc968b68f5ad56157a62da637c2e4e60
module.exports = app;