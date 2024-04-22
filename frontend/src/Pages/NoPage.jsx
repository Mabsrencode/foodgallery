import React from 'react'
import { useNavigate } from 'react-router-dom'
const NoPage = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div className="relative max-w-[100rem] flex justify-center items-center h-screen mx-auto w-full">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center mx-auto">
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-yellow-900">404</h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mt-2 text-yellow-900">Page Not Found</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">Sorry, the page you are looking for could not be found.</p>
                <button onClick={handleBack} className="font-semibold text-yellow-900 md:font-light rounded-full transition-all hover:opacity-75 py-2 bg-yellow-300 text-center px-[20px]" title="Return Home">
                    <span>Return Home</span>
                </button>
            </div>
        </div>
    )
}

export default NoPage