import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./SignInForm.css"
import SignUpForm from './SignUpForm'
const SignInForm = ({ open, setOpen }) => {
    const [openModalSignUp, setOpenModalSignUp] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    // eslint-disable-next-line
    const [message, setMessage] = useState();
    // eslint-disable-next-line
    const { username, email, password } = formData;
    // eslint-disable-next-line
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // eslint-disable-next-line
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/signup', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
            setMessage(error.response.data)
        }
    };
    const handleCloseModal = () => {
        setOpen(!open)
    }
    const handleSwitch = () => {
        setOpen(!open)
        setOpenModalSignUp(!openModalSignUp)
    }
    return (
        <>
            {openModalSignUp ? <SignUpForm open={openModalSignUp} setOpen={setOpenModalSignUp} /> : <>

                <div className={`${open ? "block" : "hidden"} h-[100vh] w-[100vw] fixed top-0 left-0 z-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30`} onClick={handleCloseModal}>
                </div>
                <div className={`${open ? "block" : "hidden"} form-container px-6`}>
                    <div className="flex flex-col items-center w-[380px] md:w-[500px] justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-900 md:text-2xl">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" required="" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-700">Remember me</label>
                                            </div>
                                        </div>
                                        <Link href="#" className="text-sm text-gray-700 font-medium hover:underline">Forgot password?</Link>
                                    </div>
                                    <button type="submit" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 font-semibold text-yellow-900">Sign in</button>
                                </form>
                                <div className="text-sm text-gray-700 flex gap-1 items-center">
                                    <p>Don't have an account yet?</p> <button onClick={handleSwitch} type='button' className="font-medium hover:underline">Sign up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default SignInForm