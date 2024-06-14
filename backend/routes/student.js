const express = require("express");
const router = express.Router();


const {viewAttendanceById} = require("../controllers/studentController");

router.route("/viewAttendanceById").post(viewAttendanceById);
module.exports = router;