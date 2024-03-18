const mongoose = require('mongoose');
const User = require("../models/UserModel");
// const Recipe = require("../models/RecipesModel");
const Meal = require("../models/MealModel");

const getMeal = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such meal" });
    }
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ error: "No such meal" });
    }
    console.log(JSON.stringify(meal, null, 2)); 
    res.status(200).json(meal);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Server error fetching meal" });
  }
};

const  createMeal = async (req, res) => {
  try {
    // Assuming password hashing is done within your User model's pre-save middleware
    const Meal = await Meal.create(req.body);
    console.log(`User created: ${req.body.username}`);
    res.status(200).json(user);
  } catch (error) {
    console.log("Failed to create user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMeal,
  createMeal,
};
