import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
const LogoutButton = () => {
    const location = useNavigate();
    const [, removeCookie] = useCookies([]);
    const handleLogout = () => {
        try {
            localStorage.clear();
            removeCookie("token");
            location('/');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <button onClick={handleLogout} className='w-full bg-yellow-900 py-3 px-6 rounded-full md:rounded-none md:bg-transparent md:w-auto md:py-0 md:px-0'><i className="fa-solid fa-right-from-bracket text-yellow-200 md:text-yellow-800 md:font-semibold hover:opacity-75 text-[20px]" title='Log Out'></i></button>
    );
}

export default LogoutButton;
