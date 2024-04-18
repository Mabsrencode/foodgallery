import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import BannerRandomResCocktail from '../Components/Banner/BannerRandomResCocktail'
import HeroImage from "../Assets/Images/cocktail.svg"
import CockTailCategory from '../Components/CocktailCategory/CockTailCategory'
const Cocktails = () => {
    const [data, setData] = useState()
    const [cocktailData, setCocktailData] = useState()
    console.log(cocktailData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
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
    const fetchCocktailData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")).data.drinks
            setCocktailData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchCocktailData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingSearch(true);
                const data = (await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchData}`)).data.drinks
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
    const fetchData = async () => {
        try {
            setLoading(true)
            const data = (await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")).data?.drinks
            setData(data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            <section className="relative bg-yellow-50">
                <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
                    <div className="flex justify-between w-full items-center flex-wrap px-2 md:px-0">
                        <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
                            <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">Explore Delicious Recipes</h1>
                            <div className="w-full mt-12">
                                <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                                    <input onChange={(e) => setSearchData(e.target.value)} placeholder="Search your favorite cocktail" className="w-full p-4 rounded-full border-none outline-none" type="text" />
                                    <button onClick={handleSearch} disabled={!searchData?.length && true} type="button" title="Start looking for new dishes today!" className="disabled:bg-yellow-200 ml-auto py-3 px-6 rounded-full text-center transition bg-yellow-300  md:px-12">
                                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                                    </button>
                                    {searchData?.length > 0 &&
                                        <ul id='search-result' className={`${isScrolled ? "hidden" : "block"} absolute w-full top-24 -left-[1px] bg-yellow-300 z-30 max-h-[300px] overflow-y-scroll rounded-xl shadow-lg`}>
                                            {loadingSearch ? <p className='px-6 py-2 font-semibold text-xs text-gray-700'>Searching...</p> : <>{searchDataValue ? searchDataValue.map((search) => (
                                                <Link to={`/drink/${search.idDrink}`} key={search.idDrink}><li className='px-6 py-2 transition-all hover:bg-white'><span className='text-yellow-900'>{search.strDrink}</span><p className='font-semibold text-xs text-gray-700'>{search.strArea}</p></li></Link>
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
                        <img src={HeroImage} className="hidden lg:block ml-auto -mb-24 lg:-mb-56 lg:w-72 rotate-[340deg]" alt="food illustration" />
                    </div>
                </div>
            </section>
            <BannerRandomResCocktail data={data} />
            <CockTailCategory cocktail={cocktailData} />
        </>
    )
}

export default Cocktails