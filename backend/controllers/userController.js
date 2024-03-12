const User = require("../models/UserModel");
// const jwt = require('jsonwebtoken');


// In your backend controller
const getUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Correctly accessing the request body
    const user = await User.findOne({ username }).populate('favoriteRecipes').populate('uploadedRecipes').populate('MealPlans');
    if (user && await user.comparePassword(password)) {
      // Exclude sensitive fields from the response
      const userResponse = {
        name: user.name,
        email: user.email,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        favoriteRecipes: user.favoriteRecipes,
      };
      res.status(200).json(userResponse);
    } else {
      res.status(400).json({ message: "Login failed. Incorrect username or password." });
    }
  } catch (error) {
    console.log("Server error during login:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};



const createUser = async (req, res) => {
  try {
    // Assuming password hashing is done within your User model's pre-save middleware
    const user = await User.create(req.body);
    console.log(`User created: ${req.body.username}`);
    res.status(200).json(user);
  } catch (error) {
    console.log("Failed to create user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
};