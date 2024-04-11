import React, { useState } from 'react'
import axios from 'axios'
const SignInForm = ({ open }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const handleSignIn = async () => {
        const formData = { username: username, password: password }
        await axios.post("/api/auth", formData)
    }
    return (
        <div className={`${open ? "block" : "hidden"} z-30 fixed flex flex-col bg-white shadow-xl rounded-xl py-3 px-6`}>
            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}

export default SignInForm