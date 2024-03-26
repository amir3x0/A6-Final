const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Recipe = require("../models/RecipesModel");
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

    // Fetch details for each uploadedRecipe
    const recipes = await Promise.all(
      meal.recipes.map(
        (recipeId) => Recipe.findById(recipeId) // Assuming `Recipe` is your model for recipes
      )
    );

    // Append the resolved recipes to the meal object or handle them as needed
    const mealWithRecipes = {
      ...meal.toObject(), // Convert Mongoose document to plain object
      recipes: recipes.filter((recipe) => recipe !== null), // Filter out any null values in case some recipes were not found
    };

    // console.log(JSON.stringify(mealWithRecipes, null, 1));
    res.status(200).json(mealWithRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching meal" });
  }
};

const createMeal = async (req, res) => {
  try {
    console.log("creating meal");
    const meal = new Meal(req.body);
    await meal.save();
    console.log(req.body.userId);
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (!user.MealPlans.includes(meal._id)) {
      user.MealPlans.push(meal._id);
      await user.save();
    }
    res.status(200).json({meal_id: meal._id});
  } catch (error) {
    console.log("Failed to create meal:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMeal,
  createMeal,
};
