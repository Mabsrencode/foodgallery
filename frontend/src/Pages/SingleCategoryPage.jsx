import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Paginate from '../Components/Paginate/Paginate'
import ImageLoader from '../Components/ImageLoader/ImageLoader'
const SingleCategoryPage = () => {
    const { _id } = useParams();
    const [data, setData] = useState([]);
    console.log(data)
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const handleImageLoad = () => {
        setTimeout(() => {
            setImageLoading(false);
        }, 2000)
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
    console.log(currentPosts)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setImageLoading(true);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response1 = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${_id}`);
                const response2 = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${_id}`);

                const data1 = response1.data.meals || [];
                const data2 = response2.data.drinks || [];

                setData([...data1, ...data2]);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };

        fetchData()
    }, [_id])
    return (
        <section className='pt-[10%]'>
            <h1 className='text-7xl font-semibold text-yellow-900 text-center my-24'>{_id}</h1>
            <div className="flex flex-wrap justify-center gap-12 container m-auto px-6  md:px-12 lg:px-7">
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
                        <Link to={(meal.idMeal && `/meal/${meal.idMeal}`) || (meal.idDrink && `/drink/${meal.idDrink}`)} key={meal.idMeal || meal.idDrink}>
                            <div className="cursor-pointer">
                                <div className="group relative m-0 flex h-72 max-w-96 rounded-xl shadow-xl  sm:mx-auto sm:max-w-lg overflow-hidden">
                                    <div className="relative z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 transition-all hover:scale-110">
                                        {imageLoading && <ImageLoader />}
                                        <img onLoad={handleImageLoad} src={`${meal.strMealThumb || meal.strDrinkThumb}`} alt="" />
                                    </div>
                                    <div className="absolute w-full bg-yellow-400 bottom-0 z-10 m-0 py-4 px-4 transition-all rounded-xl">
                                        <h1 className={`text-yellow-900 ${(meal.strMeal || meal.strDrink).length > 30 ? "text-lg" : "text-2xl"}`}>{meal.strMeal || meal.strDrink}</h1>
                                        <p className="text-sm text-gray-700 font-semibold">{meal.strArea}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : <div className="grid justify-center gap-6">
                        <p className='text-4xl'>No {_id} Found.</p>
                        <Link to={"/categories"} className='underline text-sm font-semibold mx-auto text-gray-700 py-3 px-6 rounded-full bg-yellow-400'>
                            Back to previous page.
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

export default SingleCategoryPage