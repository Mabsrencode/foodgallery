import React, { useState } from 'react'
import axios from 'axios'
import "./SignInForm.css"
const SignInForm = ({ open, setOpen }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const handleSignIn = async () => {
        const formData = { username: username, password: password }
        try {
            await axios.post("/api/auth", formData)
        } catch (error) {
            setMessage(error.message)
        }
    }
    const handleCloseModal = () => {
        setOpen(!open)
    }
    return (
        <>
            <div id='modal-container' className={`${open ? "block" : "hidden"} flex justify-center items-center h-[100vh] w-[100vw] fixed z-30 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30`} onClick={handleCloseModal}>
            </div>
            <div className='form-container px-6'>
                <div className={`${open ? "block" : "hidden"} z-30 flex flex-col gap-4 bg-white shadow-xl rounded-xl py-3 px-6 w-full mx-auto md:w-[600px]`}>
                    <h1 className='text-center text-yellow-900 text-4xl'>Sign In</h1>
                    <label htmlFor="username" className='font-semibold'>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className='px-6 py-3 border-2 border-yellow-900 rounded-xl focus:outline-yellow-900' />
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className='px-6 py-3 border-2 border-yellow-900 rounded-xl focus:outline-yellow-900' />
                    {message && <div><p className='text-red-400'>{message}</p></div>}
                    <button onClick={handleSignIn} className='text-yellow-900 font-semibold w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 mx-auto sm:w-max'>Sign In</button>
                </div>
            </div>
        </>
    )
}

export default SignInForm