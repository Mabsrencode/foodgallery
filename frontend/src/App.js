import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import RecipePage from "./Pages/RecipePage.jsx";
import AllRecipePage from "./Pages/AllCategoriesPage.jsx";
import SingleCategoryPage from "./Pages/SingleCategoryPage.jsx";
import CountryDish from "./Pages/CountryDish.jsx";
import SingleCountryDish from "./Pages/SingleCountryDish.jsx";
import NewRecipes from "./Pages/NewRecipes.jsx";
import NewRecipeSinglePage from "./Pages/NewRecipeSinglePage.jsx";
import NoPage from "./Pages/NoPage.jsx";
import Cocktails from "./Pages/Cocktails.jsx";
import CockTailRecipePage from "./Pages/CockTailRecipePage.jsx";
import CocktailSingleCategoryList from "./Pages/CocktailSingleCategoryList.jsx";
import { UserProvider } from "./Context/useContext.js";
import PostRecipePage from "./Pages/PostRecipePage.jsx";
import NewPostRecipe from "./Pages/NewPostRecipe.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/meal/:_id" element={<RecipePage />} />
            <Route path="/:_id" element={<SingleCategoryPage />} />
            <Route path="/categories" element={<AllRecipePage />} />
            <Route path="/country" element={<CountryDish />} />
            <Route path="/country/:_id" element={<SingleCountryDish />} />
            <Route path="/new_recipes" element={<NewRecipes />} />
            <Route path="/new_recipe/:_id" element={<NewRecipeSinglePage />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/drink/:_id" element={<CockTailRecipePage />} />
            <Route
              path="/drink/category/:_id"
              element={<CocktailSingleCategoryList />}
            />
            <Route path="/new-post/:_id" element={<NewPostRecipe />} />
            <Route path="*" element={<NoPage />} />
            <Route element={<UserProvider />}>
              <Route path="/post-recipe" element={<PostRecipePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
