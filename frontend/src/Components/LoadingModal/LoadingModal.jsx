import React from 'react'
import "./LoadingModal.css"
import logo from "../../Assets/logo/logo.svg"
const LoadingModal = () => {
    return (
        <>
            <div className={`block flex flex-col justify-center items-center h-[100vh] w-[100vw] fixed top-0 left-0 z-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30`}>
                <img src={logo} className='animate-spin w-[150px]' alt="logo" />
                <h1 className='text-yellow-900 text-2xl'>Loading...</h1>
            </div>

        </>
    )
}

export default LoadingModal