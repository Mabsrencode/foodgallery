import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageLoader from '../ImageLoader/ImageLoader';
const BannerRandomResCocktail = ({ data }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const handleImageLoad = () => {
        setTimeout(() => {
            setImageLoading(false);
        }, 2000)
    };
    return (
        <section className='mt-[10%]'>
            {data?.map((recipe) => (
                <div key={recipe.idDrink} className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row-reverse lg:items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className='mb-2 text-yellow-900'>Random Recipe For You</h1>
                            {recipe.strYoutube && <Link to={`${recipe.strYoutube}`} className='hover:bg-yellow-200 block mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                Watch on Youtube how to make this recipe.
                            </Link>}
                            {recipe.strSource && <Link to={recipe.strSource} className='hover:bg-yellow-200 block truncate mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                Source
                            </Link>}
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
                            <div className='mt-6'>

                                <Link to={`/drink/${recipe.idDrink}`} className='bg-yellow-300 hover:bg-yellow-200 py-3 px-6 rounded-full text-sm font-semibold text-yellow-900'>
                                    See More
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center w-full h-96 lg:w-1/2">
                        {imageLoading && <ImageLoader />}
                        <img onLoad={handleImageLoad} className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src={recipe.strDrinkThumb} alt="glasses " />

                    </div>
                </div>
            ))}
        </section >


    )
}

export default BannerRandomResCocktail