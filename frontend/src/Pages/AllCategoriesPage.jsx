import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ImageLoader from '../Components/ImageLoader/ImageLoader';
const AllRecipePage = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const handleImageLoad = () => {
        setTimeout(() => {
            setImageLoading(false);
        }, 2000)
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = (await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")).data.categories
                setData(data)
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])
    return (
        <section className="pt-[10%] px-8">
            <h1 className='text-5xl md:text-7xl font-semibold text-yellow-900 text-center my-24'>Categories</h1>
            <div className='flex min-h-screen justify-center flex-wrap gap-6'>
                {loading ? <>
                    <div className='bg-gray-400 w-[700px] h-[400px] md:h-[300px] animate-pulse rounded-xl flex flex-col md:flex-row flex-col md:flex-row gap-6'>
                        <div className='bg-gray-500 h-[300px] md:h-full w-full md:w-[70%] rounded-xl rounded-r-none'></div>
                        <div className='w-full sm:pr-6'>
                            <div className='mt-4 h-2 mx-2 md:h-6  bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-2 mx-2 md:h-6 w-[80%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[70%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[20%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[60%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-10 mx-2 mb-2 w-[35%] bg-gray-500 rounded-full'></div>
                        </div>
                    </div>
                    <div className='bg-gray-400 w-[700px] h-[400px] md:h-[300px] animate-pulse rounded-xl flex flex-col md:flex-row flex-col md:flex-row gap-6'>
                        <div className='bg-gray-500 h-[300px] md:h-full w-full md:w-[70%] rounded-xl rounded-r-none'></div>
                        <div className='w-full sm:pr-6'>
                            <div className='mt-4 h-2 mx-2 md:h-6  bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-2 mx-2 md:h-6 w-[80%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[70%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[20%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[60%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-10 mx-2 mb-2 w-[35%] bg-gray-500 rounded-full'></div>
                        </div>
                    </div>
                    <div className='bg-gray-400 w-[700px] h-[400px] md:h-[300px] animate-pulse rounded-xl flex flex-col md:flex-row flex-col md:flex-row gap-6'>
                        <div className='bg-gray-500 h-[300px] md:h-full w-full md:w-[70%] rounded-xl rounded-r-none'></div>
                        <div className='w-full sm:pr-6'>
                            <div className='mt-4 h-2 mx-2 md:h-6  bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-2 mx-2 md:h-6 w-[80%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[70%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[20%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[60%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-10 mx-2 mb-2 w-[35%] bg-gray-500 rounded-full'></div>
                        </div>
                    </div>
                    <div className='bg-gray-400 w-[700px] h-[400px] md:h-[300px] animate-pulse rounded-xl flex flex-col md:flex-row flex-col md:flex-row gap-6'>
                        <div className='bg-gray-500 h-[300px] md:h-full w-full md:w-[70%] rounded-xl rounded-r-none'></div>
                        <div className='w-full sm:pr-6'>
                            <div className='mt-4 h-2 mx-2 md:h-6  bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-2 mx-2 md:h-6 w-[80%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[70%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[20%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[60%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-10 mx-2 mb-2 w-[35%] bg-gray-500 rounded-full'></div>
                        </div>
                    </div>
                    <div className='bg-gray-400 w-[700px] h-[400px] md:h-[300px] animate-pulse rounded-xl flex flex-col md:flex-row flex-col md:flex-row gap-6'>
                        <div className='bg-gray-500 h-[300px] md:h-full w-full md:w-[70%] rounded-xl rounded-r-none'></div>
                        <div className='w-full sm:pr-6'>
                            <div className='mt-4 h-2 mx-2 md:h-6  bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-2 mx-2 md:h-6 w-[80%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[70%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[20%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[60%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-10 mx-2 mb-2 w-[35%] bg-gray-500 rounded-full'></div>
                        </div>
                    </div>
                    <div className='bg-gray-400 w-[700px] h-[400px] md:h-[300px] animate-pulse rounded-xl flex flex-col md:flex-row flex-col md:flex-row gap-6'>
                        <div className='bg-gray-500 h-[300px] md:h-full w-full md:w-[70%] rounded-xl rounded-r-none'></div>
                        <div className='w-full sm:pr-6'>
                            <div className='mt-4 h-2 mx-2 md:h-6  bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-2 mx-2 md:h-6 w-[80%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[70%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[20%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-4 h-2 mx-2 md:h-6 w-[60%] bg-gray-500 rounded-xl'></div>
                            <div className='mt-8 h-10 mx-2 mb-2 w-[35%] bg-gray-500 rounded-full'></div>
                        </div>
                    </div>
                </> : <>{data?.map((category) => (
                    <div key={category.idCategory} className="relative flex w-full max-w-[48rem] h-full md:max-h-[18rem] flex-col md:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative m-0 md:w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                            {imageLoading && <ImageLoader />}
                            <img onLoad={handleImageLoad}
                                src={`${category.strCategoryThumb}`}
                                alt={`${category.strCategory}`}
                                className="h-full w-full object-cover bg-yellow-300"
                            />
                        </div>
                        <div className="p-6">
                            <h1 className="mb-4 block text-xl font-semibold uppercase leading-relaxed tracking-normal text-yellow-800 antialiased">
                                {category.strCategory === "Dessert" ? "cake / dessert" : category.strCategory}
                            </h1>

                            <p className="mb-8 h-[8rem] text-sm sm:text-base font-normal leading-relaxed text-gray-700 text-ellipsis overflow-hidden">
                                {category.strCategoryDescription}
                            </p>
                            <Link className="inline-block" to={`/${category.strCategory === "Dessert" ? "cake" : category.strCategory}`}>
                                <button
                                    className="flex select-none items-center gap-2 rounded-full py-3 px-6 text-center align-middle  text-sm font-bold uppercase text-yellow-900 transition-all hover:bg-yellow-300 active:bg-yellow-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Learn More
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}</>}
            </div>
        </section>
    )
}

export default AllRecipePage