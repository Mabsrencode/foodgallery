import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paginate from '../Components/Paginate/Paginate';
const NewRecipes = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(data.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {
                from: '0',
                size: '100',
                tags: 'under_30_minutes'
            },
            headers: {
                'X-RapidAPI-Key': 'f8c30fb194mshbd6656c59861836p10230ejsn0db9c6d5cb04',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        try {
            setLoading(true);
            const response = (await axios.request(options)).data.results;
            setData(response)
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <section className='pt-[30%] md:pt-[10%]'>
            <h1 className='text-5xl md:text-7xl font-semibold text-yellow-900 text-center my-24'>New Recipes</h1>
            <div className='flex flex-wrap justify-center gap-12 container m-auto px-6 md:px-12 lg:px-7'>
                {loading ? <>
                    <div className='relative bg-gray-400 w-[500px] h-[250px] animate-pulse rounded-xl'>
                        <div className='absolute bottom-0 right-0 px-2 h-[80px] w-full bg-gray-500 rounded-xl flex flex-col gap-6 justify-center'>
                            <div className='relative bg-gray-400 w-[200px] h-[20px] animate-pulse rounded-xl'></div>
                            <div className='relative bg-gray-400 w-[100px] h-[10px] animate-pulse rounded-xl'></div>
                        </div>
                    </div>
                    <div className='relative bg-gray-400 w-[500px] h-[250px] animate-pulse rounded-xl'>
                        <div className='absolute bottom-0 right-0 px-2 h-[80px] w-full bg-gray-500 rounded-xl flex flex-col gap-6 justify-center'>
                            <div className='relative bg-gray-400 w-[200px] h-[20px] animate-pulse rounded-xl'></div>
                            <div className='relative bg-gray-400 w-[100px] h-[10px] animate-pulse rounded-xl'></div>
                        </div>
                    </div>
                    <div className='relative bg-gray-400 w-[500px] h-[250px] animate-pulse rounded-xl'>
                        <div className='absolute bottom-0 right-0 px-2 h-[80px] w-full bg-gray-500 rounded-xl flex flex-col gap-6 justify-center'>
                            <div className='relative bg-gray-400 w-[200px] h-[20px] animate-pulse rounded-xl'></div>
                            <div className='relative bg-gray-400 w-[100px] h-[10px] animate-pulse rounded-xl'></div>
                        </div>
                    </div>
                    <div className='relative bg-gray-400 w-[500px] h-[250px] animate-pulse rounded-xl'>
                        <div className='absolute bottom-0 right-0 px-2 h-[80px] w-full bg-gray-500 rounded-xl flex flex-col gap-6 justify-center'>
                            <div className='relative bg-gray-400 w-[200px] h-[20px] animate-pulse rounded-xl'></div>
                            <div className='relative bg-gray-400 w-[100px] h-[10px] animate-pulse rounded-xl'></div>
                        </div>
                    </div>
                    <div className='relative bg-gray-400 w-[500px] h-[250px] animate-pulse rounded-xl'>
                        <div className='absolute bottom-0 right-0 px-2 h-[80px] w-full bg-gray-500 rounded-xl flex flex-col gap-6 justify-center'>
                            <div className='relative bg-gray-400 w-[200px] h-[20px] animate-pulse rounded-xl'></div>
                            <div className='relative bg-gray-400 w-[100px] h-[10px] animate-pulse rounded-xl'></div>
                        </div>
                    </div>
                    <div className='relative bg-gray-400 w-[500px] h-[250px] animate-pulse rounded-xl'>
                        <div className='absolute bottom-0 right-0 px-2 h-[80px] w-full bg-gray-500 rounded-xl flex flex-col gap-6 justify-center'>
                            <div className='relative bg-gray-400 w-[200px] h-[20px] animate-pulse rounded-xl'></div>
                            <div className='relative bg-gray-400 w-[100px] h-[10px] animate-pulse rounded-xl'></div>
                        </div>
                    </div>
                </> : <>
                    {currentPosts ? currentPosts?.map((meal) => (
                        <Link to={`/new_recipe/${meal.id}`} key={meal.id}>
                            <div className="cursor-pointer">
                                <div className="group relative m-0 flex h-72 max-w-96 rounded-xl shadow-xl  sm:mx-auto sm:max-w-lg overflow-hidden">
                                    <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 transition-all hover:scale-110">
                                        <img src={`${meal.thumbnail_url}`} alt="" />
                                    </div>
                                    <div className="absolute w-full bg-yellow-400 bottom-0 z-10 m-0 py-4 px-4 transition-all rounded-xl">
                                        <h1 className={`text-yellow-900 ${meal.name.length > 20 ? "text-lg" : "text-2xl"}`}>{meal.name}</h1>
                                        <p className="text-sm text-gray-700 font-semibold">{meal.country}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : <div className="grid justify-center gap-6 pt-[10%]">
                        <p className='text-4xl'>No Recipe Found.</p>
                        <Link to={"/"} className='underline text-sm font-semibold mx-auto text-gray-700 py-3 px-6 rounded-full bg-yellow-400'>
                            Back to Home page.
                        </Link>
                    </div>}
                </>}
            </div>
            {data ? (
                <div className="blog-content-section">
                    <Paginate
                        postsPerPage={postsPerPage}
                        totalPosts={data.length}
                        paginate={paginate}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        currentPage={currentPage}
                    />
                </div>
            ) : (
                <></>
            )}
        </section>
    )
}

export default NewRecipes