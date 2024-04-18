import React from 'react'
import { Link } from 'react-router-dom'
const CockTailCategory = ({ cocktail }) => {
    return (
        <section className="pt-[10%] px-8">
            <h1 className='text-5xl md:text-7xl font-semibold text-yellow-900 text-center my-24'>Categories</h1>
            <ul className='flex flex-col sm:flex-row gap-6 justify-center flex-wrap lg:w-1/2 mx-auto'>
                {cocktail?.map((category) => (
                    <Link key={category.strCategory} to={`/drink/category/${category.strCategory}`} className='px-6 py-3 bg-yellow-400 rounded-full font-semibold text-center'>{category.strCategory}</Link>
                ))}
            </ul>
        </section>
    )
}

export default CockTailCategory