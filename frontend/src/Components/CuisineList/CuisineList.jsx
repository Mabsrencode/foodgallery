import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CuisineList = () => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const getCuisineRecipes = async () => {
            const cuisineNames = ['Filipino', 'Italian', 'Japanese'];
            const cuisineRecipes = await Promise.all(
                cuisineNames.map(async (cuisine) => {
                    try {
                        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
                        const meals = response.data.meals;
                        const limitedMeals = meals ? meals.slice(0, 4) : [];
                        return { cuisine, recipes: limitedMeals };
                    } catch (error) {
                        console.error(error);
                        return { cuisine, recipes: [] };
                    }
                })
            );
            setRecipes(cuisineRecipes);
        };

        getCuisineRecipes();
    }, []);

    return (
        <section className='mt-[10%]'>
            {recipes.map(({ cuisine, recipes }) => (
                <div key={cuisine} className='container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7'>
                    <div className='flex justify-between items-center text-xl'>
                        <h2 className='text-yellow-900 md:text-4xl'>{cuisine} Recipes</h2>
                        <Link to={`/country/${cuisine}`} className='text-gray-700 font-semibold hover:underline'>View All</Link>
                    </div>
                    <ul className='flex justify-center items-center flex-wrap mt-6 gap-24 md:gap-12 mt-[5%]'>
                        {recipes.map(recipe => (
                            <li key={recipe.idMeal} className='relative h-52 w-full lg:w-80 shadow-xl bg-yellow-50 rounded-lg overflow-hidden'>
                                <Link to={`/meal/${recipe.idMeal}`}>
                                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-full object-cover rounded-lg hover:scale-110 transition-all' />
                                    <h1 className='absolute right-0 bottom-0 text-yellow-900 w-full py-3 px-6 bg-yellow-300 '>{recipe.strMeal}</h1>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}

export default CuisineList;
