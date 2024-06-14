const express = require("express");
const router = express.Router();

const {login, logout, testfaculty, viewAttendanceByTable, giveAttendance, viewStudentsByDepartmentIdAndSem, viewnext, viewPaperId} = require("../controllers/facultyController");

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/addAttendance").post(giveAttendance);
router.route("/viewAttendance").post(viewAttendanceByTable);
router.route("/viewStudents").post(viewStudentsByDepartmentIdAndSem);
router.route("/students").get(viewnext);
router.route("/papers").get(viewPaperId);
module.exports = router;