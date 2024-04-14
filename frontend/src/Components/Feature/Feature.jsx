import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageLoader from '../ImageLoader/ImageLoader';
const Feature = () => {
    const [imageLoading, setImageLoading] = useState(true);
    const handleImageLoad = () => {
        setTimeout(() => {
            setImageLoading(false);
        }, 2000)
    };
    return (
        <section className='mt-[10%]'>
            <h1 className='text-center text-4xl md:text-7xl text-yellow-900 mb-6'>Wife's Favorite</h1>
            <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                            Beef Caldereta
                        </h1>
                        <ul className="mt-8 space-y-5">
                            <p className="mx-2">
                                Beef Caldereta
                                A classic Filipino beef stew simmered in tomato sauce together with carrots, potatoes, and capsicums. Best paired with a steaming hot rice. </p>
                        </ul>
                        <div className='mt-6'>

                            <Link to={`/meal/53070`} className='bg-yellow-300 py-3 px-6 rounded-full text-sm font-semibold text-yellow-900'>
                                See More
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-center w-full h-96 lg:w-1/2">
                    {imageLoading && <ImageLoader />}
                    <img onLoad={handleImageLoad} className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://www.themealdb.com/images/media/meals/41cxjh1683207682.jpg" alt="glasses " />
                </div>
            </div>
            <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row-reverse lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                            Big Mac
                        </h1>
                        <ul className="mt-8 space-y-5">
                            <p className="mx-2">
                                For bigs and young once, you will never go wrong with a good American burger meal!</p>
                        </ul>
                        <div className='mt-6'>

                            <Link to={`/meal/53013`} className='bg-yellow-300 py-3 px-6 rounded-full text-sm font-semibold text-yellow-900'>
                                See More
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-center w-full h-96 lg:w-1/2">
                    {imageLoading && <ImageLoader />}
                    <img onLoad={handleImageLoad} className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg" alt="glasses " />
                </div>
            </div>
            <div className="container flex flex-col-reverse gap-6 px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-bold tracking-wide text-yellow-900 lg:text-5xl">
                            Pizza Express Margherita
                        </h1>
                        <ul className="mt-8 space-y-5">
                            <p className="mx-2">The classic Italian pizza. Told to represent the color of the country's flag: green, white, and red.</p>
                        </ul>
                        <div className='mt-6'>

                            <Link to={`/meal/53014`} className='bg-yellow-300 py-3 px-6 rounded-full text-sm font-semibold text-yellow-900'>
                                See More
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative flex items-center justify-center w-full h-96 lg:w-1/2">
                    {imageLoading && <ImageLoader />}
                    <img onLoad={handleImageLoad} className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg" alt="glasses " />
                </div>
            </div>
        </section>
    )
}

export default Feature