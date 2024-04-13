import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoadingModal from '../Components/LoadingModal/LoadingModal';
const CountryDish = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")).data.meals
            setData(data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            {loading ? <LoadingModal /> : <section className='pt-[10%]'>
                <h1 className='text-7xl font-semibold text-yellow-900 text-center my-24'>Countries</h1>
                <div className='flex container items-center justify-center flex-wrap gap-12 mx-auto'>
                    {data?.map((country, key) => (
                        <Link to={`/country/${country.strArea}`} key={key}>
                            <div className='bg-yellow-400 py-3 px-6 rounded-full hover:bg-yellow-300'>
                                <h1>{country.strArea}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>}
        </>
    )
}

export default CountryDish