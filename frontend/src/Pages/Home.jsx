import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HeroImage from "../Assets/logo/hero.svg"
import BannerRandomRes from '../Components/Banner/BannerRandomRes'
import Feature from '../Components/Feature/Feature';
import CuisineList from './CuisineList';
const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [searchData, setSearchData] = useState();
    const [searchDataValue, setSearchDataValue] = useState();
    const [isScrolled, setIsScrolled] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get("https://www.themealdb.com/api/json/v1/1/random.php")).data.meals
                setData(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingSearch(true);
                const data = (await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`)).data.meals
                setSearchDataValue(data);
                setLoadingSearch(false)
            } catch (error) {
                console.log(error)
                setLoadingSearch(false)
            }
        }
        fetchData();
    }, [searchData]);
    const handleSearch = () => {
        navigate(`/${searchData}`)
    }
    return (
        <>
            <section className="relative bg-yellow-50">
                <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
                    <div className="flex items-center flex-wrap px-2 md:px-0">
                        <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
                            <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">Explore Delicious Recipes</h1>
                            <div className="w-full mt-12">
                                <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                                    <input onChange={(e) => setSearchData(e.target.value)} placeholder="Search your favorite food" className="w-full p-4 rounded-full border-none outline-none" type="text" />
                                    <button onClick={handleSearch} disabled={!searchData?.length && true} type="button" title="Start looking for new dishes today!" className="disabled:bg-yellow-200 ml-auto py-3 px-6 rounded-full text-center transition bg-yellow-300  md:px-12">
                                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                                    </button>
                                    {searchData?.length > 0 &&
                                        <ul id='search-result' className={`${isScrolled ? "hidden" : "block"} absolute w-full top-24 -left-[1px] bg-yellow-300 max-h-[300px] overflow-y-scroll rounded-xl shadow-lg`}>
                                            {loadingSearch ? <p className='px-6 py-2 font-semibold text-xs text-gray-700'>Searching...</p> : <>{searchDataValue ? searchDataValue.map((search) => (
                                                <Link to={`/meal/${search.idMeal}`} key={search.idMeal}><li className='px-6 py-2 transition-all hover:bg-white'><span className='text-yellow-900'>{search.strMeal}</span><p className='font-semibold text-xs text-gray-700'>{search.strArea}</p></li></Link>
                                            )) : <p className='px-6 py-2 font-semibold text-xs text-gray-700'>No search found.</p>}</>}
                                        </ul>
                                    }
                                </div>
                            </div>
                            <p className="my-8 text-gray-700 lg:w-10/12">Step into a world where flavor reigns supreme. Whether you're craving comfort food classics, exploring exotic cuisines, or seeking healthy alternatives, we've got you covered.</p>
                            <Link to={"/categories"} className='py-3 px-6 text-center text-yellow-900 font-semibold text-sm rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300'>
                                See More
                            </Link>
                        </div>
                        <div className="hidden lg:block ml-auto -mb-24 lg:-mb-56 lg:w-6/12">
                            <img src={HeroImage} className="relative" alt="food illustration" loading="lazy" width="4500" height="4500" />
                        </div>
                    </div>
                </div>
            </section>
            <BannerRandomRes data={data} />
            <Feature />
            <CuisineList />
        </>
    )
}

export default Home