const express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser')
require("dotenv").config();
const app = express();

//regular middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const faculty = require("./routes/faculty");
const student = require("./routes/student");
//router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1/attendance", faculty);
app.use("/api/v1/student", student)
// export app js
module.exports = app;