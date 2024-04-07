import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header.jsx"
import Footer from "../Components/Footer/Footer.jsx"
const Layout = () => {
    return (
        <>
            <Header />
            <main className='relative min-h-screen bg-yellow-50'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout