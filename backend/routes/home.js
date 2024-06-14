const express = require("express");
const router = express.Router();

const {home, about} = require("../controllers/homeController"); //destructure

router.route("/").get(home);
router.route("/about").get(about)



module.exports = router;