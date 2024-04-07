import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import RecipePage from "./Pages/RecipePage.jsx";
import AllRecipePage from "./Pages/AllCategoriesPage.jsx";
import SingleCategoryPage from "./Pages/SingleCategoryPage.jsx";
import CountryDish from "./Pages/CountryDish.jsx";
import SingleCountryDish from "./Pages/SingleCountryDish.jsx";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
