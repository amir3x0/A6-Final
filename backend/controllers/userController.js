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
      return res
        .status(400)
        .json({ message: "Login failed. Incorrect password." });
    }

    // Preparing user data to send back, excluding the password for security
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      favoriteRecipes: user.favoriteRecipes,
      uploadedRecipes: user.uploadedRecipes,
      MealPlans: user.MealPlans,
    };
    // console.log(`User logged in: ${user}`);
    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(`User created: ${req.body.username}`);
    res.status(200).json(user);
  } catch (error) {
    console.log("Failed to create user:", error);
    res.status(500).json({ error: error.message });
  }
};

const addFavorite = async (req, res) => {
  const { recipeId, userId } = req.body;
  // console.log(`Adding recipe ${recipeId} to favorites for user ${userId}`);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Add the recipeId to the favoriteRecipes array if it's not already included
    if (!user.favoriteRecipes.includes(recipeId)) {
      user.favoriteRecipes.push(recipeId);
      await user.save();
    }
    res.status(200).send("Recipe added to favorites successfully");
  } catch (error) {
    console.error("Error adding favorite recipe:", error);
    res.status(500).send("Internal server error");
  }
};

const removeFavorite = async (req, res) => {
  const { recipeId, userId } = req.query;
  // console.log(`Removing recipe ${recipeId} from favorites for user ${userId}`);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.favoriteRecipes = user.favoriteRecipes.filter((id) => id !== recipeId);
    await user.save();
    res.status(200).send("Recipe removed from favorites successfully");
  } catch (error) {
    console.error("Error removing favorite recipe:", error);
    res.status(500).send("Internal server error");
  }
};

const bioUpdate = async (req, res) => {
  const { userId, bio } = req.body;
  console.log(`Updating bio for user ${userId}`);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.bio = bio;
    await user.save();
    res.status(200).send("Bio updated successfully");
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).send("Internal server error");
  }
};

const themeUpdate = async (req, res) => {
  const { userId, theme } = req.body;
  console.log(`Updating theme for user ${userId}`);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.theme = theme;
    await user.save();
    res.status(200).send("theme updated successfully");
  } catch (error) {
    console.error("Error updating theme:", error);
    res.status(500).send("Internal server error");
  }
};

// Function to upload a new shared recipe to user.
const addUploadedRecipe = async (req, res) => {
  const { userId, recipeId} = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.uploadedRecipes.push(recipeId);
    await user.save();
    res.status(200).send("All guchi.");
  } catch (error) {
    res.status(500).send("Something went wrong, server side.");
  }
}

module.exports = {
  createUser,
  getUser,
  addFavorite,
  removeFavorite,
  addUploadedRecipe,
  bioUpdate,
  themeUpdate,
};
