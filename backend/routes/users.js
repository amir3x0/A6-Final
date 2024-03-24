const express = require("express");
const { createUser, getUser, addFavorite } = require("../controllers/userController");
const verifyToken = require("../middlewares/authmiddleware"); 
// const { addfavoriteRecipe } = require("../../frontend/src/services/BackendService");
const router = express.Router();

// Public route: Login does not require authentication
router.post("/login", getUser);
 
// Public route: Creating a new user does not require authentication
router.post("/", createUser);

router.post("/favorite", addFavorite);

module.exports = router;

