const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getAllRecipeFromUser,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes.controller.js");
router.get("/all-recipes", getAllRecipes);
router.get("/post", getAllRecipeFromUser);
router.post("/create-recipe", createRecipe);
router.put("/update-recipe/:id", updateRecipe);
router.delete("/delete-recipe/:id", deleteRecipe);
module.exports = router;
