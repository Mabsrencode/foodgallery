import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const RecipePage = () => {
    const { _id } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchRecipe = async () => {
            const data = (await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${_id}`)).data.meals;
            setData(data);
        }
        fetchRecipe()
    }, [_id])
    return (
        <section className='pt-[10%]'>
            {data?.map((recipe) => (
                <div key={recipe.idMeal}>
                    <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row-reverse lg:items-center">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                {recipe.strYoutube && <Link to={`${recipe.strYoutube}`} className='hover:bg-yellow-200 block mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                    Watch on Youtube how to make this recipe.
                                </Link>}
                                {recipe.strSource && <Link to={recipe.strSource} className='hover:bg-yellow-200 block truncate mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                    Source
                                </Link>}
                                <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                                    {recipe.strMeal}
                                </h1>

                                <ul className="mt-8 space-y-5">
                                    <li className="flex items-center -mx-2 text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                        <p className="mx-2">{recipe.strArea}</p>
                                    </li>

                                    <li className="flex items-center -mx-2 text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                        <p className="mx-2">{recipe.strCategory}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full h-96 lg:w-1/2 ">
                            <img className="object-cover w-full h-[300px] sm:h-full mx-auto rounded-md lg:max-w-2xl" src={recipe.strMealThumb} alt="glasses " />
                        </div>
                    </div>
                    <div className='container flex flex-col-reverse gap-12 px-6 py-10 mx-auto lg:flex-row '>
                        <div className='w-full lg:w-1/2'>
                            <h1 className='text-xl text-yellow-900 font-bold'>DIRECTIONS</h1>
                            <p className='text-justify text-gray-700 mt-6'>{recipe.strInstructions}</p>
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <h1 className='text-xl text-yellow-900 font-bold'>INGREDIENTS</h1>
                            <ul className='mt-6'>
                                {recipe.strIngredient1 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure1}</strong> {recipe.strIngredient1}</li>)}
                                {recipe.strIngredient2 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure2}</strong> {recipe.strIngredient2}</li>)}
                                {recipe.strIngredient3 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure3}</strong> {recipe.strIngredient3}</li>)}
                                {recipe.strIngredient4 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure4}</strong> {recipe.strIngredient4}</li>)}
                                {recipe.strIngredient5 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure5}</strong> {recipe.strIngredient5}</li>)}
                                {recipe.strIngredient6 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure6}</strong> {recipe.strIngredient6}</li>)}
                                {recipe.strIngredient7 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure7}</strong> {recipe.strIngredient7}</li>)}
                                {recipe.strIngredient8 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure8}</strong> {recipe.strIngredient8}</li>)}
                                {recipe.strIngredient9 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure9}</strong> {recipe.strIngredient9}</li>)}
                                {recipe.strIngredient10 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure10}</strong> {recipe.strIngredient10}</li>)}
                                {recipe.strIngredient11 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure11}</strong> {recipe.strIngredient11}</li>)}
                                {recipe.strIngredient12 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure12}</strong> {recipe.strIngredient12}</li>)}
                                {recipe.strIngredient13 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure13}</strong> {recipe.strIngredient13}</li>)}
                                {recipe.strIngredient14 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure14}</strong> {recipe.strIngredient14}</li>)}
                                {recipe.strIngredient15 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure15}</strong> {recipe.strIngredient15}</li>)}
                                {recipe.strIngredient16 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure16}</strong> {recipe.strIngredient16}</li>)}
                                {recipe.strIngredient17 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure17}</strong> {recipe.strIngredient17}</li>)}
                                {recipe.strIngredient18 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure18}</strong> {recipe.strIngredient18}</li>)}
                                {recipe.strIngredient19 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure19}</strong> {recipe.strIngredient19}</li>)}
                                {recipe.strIngredient20 && (<li className='capitalize flex gap-6'><strong>{recipe.strMeasure20}</strong> {recipe.strIngredient20}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </section >
    )
}

export default RecipePage