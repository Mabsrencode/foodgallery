const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getAllRecipeFromUser,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
  getAllSearch,
  getDataByCategory,
  getDataByCountry,
} = require("../controllers/recipes.controller.js");
router.get("/all-recipes", getAllRecipes);
router.get("/get-recipe", getRecipeById);
router.get("/post", getAllRecipeFromUser);
router.post("/create-recipe", createRecipe);
router.put("/update-recipe/:id", updateRecipe);
router.delete("/delete-recipe/:id", deleteRecipe);
router.get("/search", getAllSearch);
router.get("/category", getDataByCategory);
router.get("/country", getDataByCountry);
module.exports = router;
