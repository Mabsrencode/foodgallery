import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./SignInForm.css"
import SignInForm from './SignInForm'
const SignUpForm = ({ open, setOpen }) => {
    const [openSignInModal, setOpenSignInModal] = useState(false)
    const handleCloseModal = () => {
        setOpen(!open)
    }
    const handleSwitch = () => {
        setOpenSignInModal(!openSignInModal)
    }
    return (
        <>
            {openSignInModal ? <SignInForm open={openSignInModal} setOpen={setOpenSignInModal} /> : <>
                <div className={`${open ? "block" : "hidden"} h-[100vh] w-[100vw] fixed top-0 left-0 z-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30`} onClick={handleCloseModal}>
                </div>
                <div className={`${open ? "block" : "hidden"} form-container px-6`}>
                    <div className="flex flex-col items-center w-[380px] md:w-[500px] justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-900 md:text-2xl">
                                    Sign Up
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium">Your username</label>
                                        <input type="username" name="username" id="username" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                        <input type="email" name="email" id="SignUpEmail" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                        <input type="password" name="password" id="SignUpPassword" placeholder="••••••••" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Confirm Password</label>
                                        <input type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" required="" />
                                    </div>
                                    <button type="submit" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 font-semibold text-yellow-900">Sign up</button>
                                </form>
                                <div className="text-sm text-gray-700 flex gap-1 items-center">
                                    <p>Already have an account?</p> <button onClick={handleSwitch} type='button' className="font-medium hover:underline">Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default SignUpForm