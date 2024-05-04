import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoadingModal from '../Components/LoadingModal/LoadingModal'
import FetchDataRecipeQuery from '../Middleware/FetchDataRecipeQuery'
const NewPostRecipe = () => {
    const { _id } = useParams();
    const [data, setData] = useState([]);
    console.log(data)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const data = await FetchDataRecipeQuery("/post-recipe/get-recipe?recipe=", _id);
                setData([data?.data]);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
        fetchRecipe()
    }, [_id])
    return (
        <section className='pt-[10%]'>
            {loading ? <LoadingModal /> : <>
                {data?.map((recipe) => (
                    <div key={recipe._id}>
                        <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row-reverse lg:items-center">
                            <div className="w-full lg:w-1/2">
                                <h1 className='mb-2 text-yellow-900 capitalize'>Posted By {recipe.userName}</h1>
                                <div className="lg:max-w-lg">
                                    {(recipe.youtube) && <Link to={`${recipe.youtube}`} className='hover:bg-yellow-200 block mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                        Watch on Youtube how to make this recipe.
                                    </Link>}
                                    {(recipe.source) && <Link to={recipe.source} className='hover:bg-yellow-200 block truncate mb-4 bg-yellow-300 px-6 py-2 text-center rounded-lg font-semibold text-yellow-900'>
                                        Source
                                    </Link>}
                                    <h1 className={`font-bold tracking-wide text-yellow-900 ${recipe.title.length > 30 ? "text-3xl" : "text-4xl"}`}>
                                        {recipe.title}
                                    </h1>

                                    <ul className="mt-8 space-y-5">
                                        <li className="flex items-center -mx-2 text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                            <p className="mx-2">{recipe.country}</p>
                                        </li>

                                        <li className="flex items-center -mx-2 text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                            <p className="mx-2">{recipe.category}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full h-96 lg:w-1/2 ">
                                <img className="object-cover w-full h-[300px] sm:h-full mx-auto rounded-md lg:max-w-2xl" src={recipe.selectedFile} alt="glasses " />
                            </div>
                        </div>
                        <div className='container flex flex-col-reverse gap-12 px-6 py-10 mx-auto lg:flex-row-reverse '>
                            <div className='w-full lg:w-1/2'>
                                <h1 className='text-xl text-yellow-900 font-bold'>DIRECTIONS</h1>
                                <p className='text-justify text-gray-700 mt-6'>{recipe.instruction}</p>
                            </div>
                            <div className='w-full lg:w-1/2'>
                                <h1 className='text-xl text-yellow-900 font-bold'>INGREDIENTS</h1>
                                <ul className='mt-6 grid grid-cols-2 md:grid-cols-3 grid-rows gap-4'>
                                    {recipe.ingredients?.map((instruction, index) => (
                                        <li key={instruction.id} className='mt-3'>
                                            <strong className="font-bold text-yellow-900">{index + 1}.</strong> {instruction}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </>}
        </section >
    )
}

export default NewPostRecipe