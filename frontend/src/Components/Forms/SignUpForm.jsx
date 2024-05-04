import React, { useState } from 'react'
import axios from 'axios'
import "./SignInForm.css"
import SignInForm from './SignInForm'
const SignUpForm = ({ open, setOpen }) => {
    const [openSignInModal, setOpenSignInModal] = useState(false)
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(5)
    const [error, setError] = useState(false)
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cpassword, setCPassword] = useState()
    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = (await axios.post('https://rich-red-snail-boot.cyclic.app/auth/register', {
                username,
                email,
                password,
                cpassword
            }, { withCredentials: true }))
            setData(response?.data?.message)
            setLoading(false)
            setError(false)
            setRedirect(true);
            setTimeout(() => {
                let currentCount = count;
                const interval = setInterval(() => {
                    currentCount = currentCount - 1;
                    setCount(currentCount);
                    if (currentCount === 0) {
                        clearInterval(interval);
                        if (currentCount === 0) {
                            setOpenSignInModal(!openSignInModal)
                        }
                    }
                }, 1000);
            });
        } catch (error) {
            setData(error.response.data.message || error.message)
            setLoading(false)
            setError(true)
            setRedirect(false)
        }
    }

    const handleCloseModal = () => {
        setOpen(!open)
    }
    const handleSwitch = () => {
        setOpen(!open)
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
                                <div className='flex justify-between items-center'>
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-900 md:text-2xl">
                                        Create an account
                                    </h1>
                                    <div onClick={handleCloseModal} className='w-8 px-2 py-1 rounded-full cursor-pointer hover:bg-yellow-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                                    </div>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium">Your username</label>
                                        <input onChange={(e) => { setUsername(e.target.value) }} type="username" name="username" id="username" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" placeholder="Username" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" id="email" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" placeholder="Your Email" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="SignUpPassword" placeholder="••••••••" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Confirm Password</label>
                                        <input onChange={(e) => { setCPassword(e.target.value) }} type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-yellow-50 border-2 border-yellow-900 text-gray-900 sm:text-sm rounded-lg focus:outline-yellow-400 focus:border-yellow-900 block w-full p-2.5" required="" />
                                    </div>
                                    <button disabled={loading} onClick={handleSubmit} type="submit" className="w-full mb-6 py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-200 disabled:bg-yellow-200 disabled:cursor-no-drop active:bg-yellow-300 focus:bg-yellow-300 font-semibold text-yellow-900"> {redirect ? <span>Redirect in <span className="rounded-full border-2 border-yellow-900 h-2 px-1 text-sm">{count}</span></span> : <>
                                        {loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-yellow-300 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#713f12" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg> Processing...</> : <>Sign Up</>}
                                    </>}</button>
                                    <span className={`block ${error ? "text-red-700" : "text-green-700"}`}>{data}</span>
                                </div>
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