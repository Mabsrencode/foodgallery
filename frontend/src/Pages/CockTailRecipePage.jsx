import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import LoadingModal from '../Components/LoadingModal/LoadingModal'
const CockTailRecipePage = () => {
    const { _id } = useParams()
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${_id}`)).data.drinks
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(first)
        }
    }
    useEffect(() => {
        fetchData();
    }, [_id])
    return (
        <section className='pt-[10%]'>
            {loading ? <LoadingModal /> : <>
                {data?.map((recipe) => (
                    <div key={recipe.idDrink}>
                        <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row-reverse lg:items-center">
                            <div className="w-full lg:w-1/2">
                                <div className="lg:max-w-lg">
                                    {recipe.strYoutube && <Link to={`${recipe.strYoutube}`} className='hover:bg-yellow-200 block mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                        Watch on Youtube how to make this recipe.
                                    </Link>}
                                    {recipe.strSource && <Link to={recipe.strSource} className='hover:bg-yellow-200 block truncate mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                        Source
                                    </Link>}
                                    <div className='mb-12'>
                                        <p className='inline-block px-6 py-2 bg-yellow-900 text-xs text-gray-200 rounded-lg'>{moment(recipe.dateModified).fromNow()}</p>
                                    </div>
                                    <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                                        {recipe.strDrink}
                                    </h1>

                                    <ul className="mt-8 space-y-5">
                                        <li className="flex items-center -mx-2 text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                            <p className="mx-2">{recipe.strAlcoholic}</p>
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
                                <img className="object-cover w-full h-[300px] sm:h-full mx-auto rounded-md lg:max-w-2xl" src={recipe.strDrinkThumb} alt="glasses " />
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
                                    {[...Array(20).keys()].map(index => {
                                        const ingredient = recipe[`strIngredient${index + 1}`];
                                        const measurement = recipe[`strMeasure${index + 1}`];
                                        if (ingredient) {
                                            return (
                                                <li key={index} className='capitalize flex gap-6'>
                                                    <strong>{measurement}</strong> {ingredient}
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </>}
        </section >
    )
}

export default CockTailRecipePage