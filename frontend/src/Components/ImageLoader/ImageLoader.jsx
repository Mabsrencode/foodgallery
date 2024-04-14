import React from 'react'
import logo from "../../Assets/logo/logo.svg"
const ImageLoader = ({ text }) => {
    return (
        <div className='absolute top-0 left-0 flex justify-center items-center w-full bg-yellow-300 h-full rounded-lg'>
            <div className='text-center'>
                <img src={logo} className='animate-spin w-[100px]' alt="logo" />
                {text && <h1 className='text-yellow-900 text-2xl inline-block'>{text}</h1>}
            </div>
        </div>
    )
}

export default ImageLoader