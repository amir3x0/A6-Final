const Recipe = require("../models/RecipesModel");
const mongoose = require("mongoose");

// get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });

  res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(200).json({});
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such recipe" });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      // Instead of returning an error, return an empty response or default value
      return res.status(200).json({});
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching recipe" });
  }
};

// Share recipe
const shareRecipe = async (req, res) => {
  try {
    console.log(req.body);
    const recipe = new Recipe(req.body);
    // Saving the recipe document to the database
    await recipe.save();
    res.status(200).json({ message: "Recipe shared successfully!", recipe });
  } catch (error) {
    // Log the error
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });

  if (!recipe) {
    // check if there is such object whit this id in the db
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

module.exports = {
  getRecipe,
  getRecipes,
  shareRecipe,
  deleteRecipe,
  updateRecipe,
};
