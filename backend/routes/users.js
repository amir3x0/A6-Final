const express = require("express");
const { createUser, getUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/authmiddleware"); // Adjust the path as necessary
const upload = require("../services/imageKitService");
const router = express.Router();

// Public route: Login does not require authentication
router.post("/login", getUser);
 
// Public route: Creating a new user does not require authentication
router.post("/", createUser);

router.post("/updateProfilePicture", verifyToken, upload.single('file'), updateUserProfilePicture);

module.exports = router;

