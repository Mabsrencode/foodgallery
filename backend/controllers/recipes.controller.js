const Recipe = require("../models/recipe.js");
const User = require("../models/user.js");
// Get all Recipe
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//search
const getAllSearch = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Recipe.find({
      title: { $regex: new RegExp(query, "i") },
    });
    res.json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get recipe by category
const getDataByCategory = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Recipe.find({
      category: { $regex: new RegExp(query, "i") },
    });
    res.json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get recipe by country
const getDataByCountry = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Recipe.find({
      country: { $regex: new RegExp(query, "i") },
    });
    res.json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get recipe by recipe ID
const getRecipeById = async (req, res) => {
  const recipeId = req.query.recipe;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get recipe only for user
const getAllRecipeFromUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const recipes = await Recipe.find({ userId: userId });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a recipe
const createRecipe = async (req, res) => {
  const {
    title,
    instruction,
    ingredients,
    selectedFile,
    category,
    country,
    youtube,
    source,
    userId,
    userName,
  } = req.body;
  const recipe = new Recipe({
    title: title,
    instruction: instruction,
    ingredients: ingredients,
    selectedFile: selectedFile,
    category: category,
    country: country,
    youtube: youtube,
    source: source,
    userId: userId,
    userName: userName,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a recipe
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

// Delete a recipe
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
  getRecipeById,
  getAllSearch,
  getDataByCategory,
  getDataByCountry,
};
