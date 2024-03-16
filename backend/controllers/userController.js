const User = require("../models/UserModel");
const Recipe = require("../models/RecipesModel");

// get user
const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Login failed. User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Login failed. Incorrect password." });
    }

    // Preparing user data to send back, excluding the password for security
    const userResponse = {
      name: user.name,
      email: user.email,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      favoriteRecipes: user.favoriteRecipes, 
      uploadedRecipes: user.uploadedRecipes, 
      MealPlans: user.MealPlans,
    };
    console.log(`User logged in: ${user}`);
    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Server error during login:", error);
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
