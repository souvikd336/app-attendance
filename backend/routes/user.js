const express = require("express");
//const {isLoggedIn} = require('../middlewares/auth')
const router = express.Router();

const {viewAllStudents, userRegister, login, addStudent, addSubject, viewAllSubjects, addAttendanceTable,addFaculty, viewAllFaculty, logout} = require("../controllers/userController")

router.route("/login").post(login);
router.route("/register").post(userRegister);
router.route("/logout").get(logout);
router.route("/student-register").post(addStudent);
router.route("/subject-register").post(addSubject);
router.route("/viewAllSubjects").get(viewAllSubjects);
router.route("/addAttendanceTable").post(addAttendanceTable);
router.route("/viewAllStudents").get(viewAllStudents);
router.route("/addFaculty").post(addFaculty);
router.route("/viewAllFaculty").get(viewAllFaculty);
module.exports = router;