const Recipe = require("../models/recipe.js");
const User = require("../models/user.js");
// Get all job Recipe
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRecipeFromUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const recipes = await Recipe.find({ userId: userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a job offer
const createRecipe = async (req, res) => {
  const { title, instruction, ingredients, selectedFile, userId } = req.body;
  const recipe = new Recipe({
    title: title,
    instruction: instruction,
    ingredients: ingredients,
    selectedFile: selectedFile,
    userId: userId,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a job offer
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job offer
const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRecipes,
  getAllRecipeFromUser,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
