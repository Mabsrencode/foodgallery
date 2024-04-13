import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../Assets/logo/logo.svg";
import SignInForm from '../Forms/SignInForm';
import SignUpForm from '../Forms/SignUpForm';

const Header = () => {
    const [navClick, setNavClick] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openSignInModal, setOpenSignInModal] = useState(false);
    const [openSignUpModal, setOpenSignUpModal] = useState(false);

    const handleClick = () => {
        setNavClick(!navClick);
        if (!navClick) {
            document.getElementById("line").style.rotate = "45deg";
            document.getElementById("line2").style.marginTop = "-2px";
            document.getElementById("line2").style.rotate = "-45deg";
        } else {
            document.getElementById("line").style.rotate = "0deg";
            document.getElementById("line2").style.marginTop = "8px";
            document.getElementById("line2").style.rotate = "0deg";
        }
    };

    const handleOpenSignUpForm = () => {
        setOpenSignUpModal(!openSignUpModal);
        setOpenSignInModal(false);
        setNavClick(!navClick);
        document.getElementById("line").style.rotate = "0deg";
        document.getElementById("line2").style.marginTop = "8px";
        document.getElementById("line2").style.rotate = "0deg";
    };

    const handleOpenSignInForm = () => {
        setOpenSignInModal(!openSignInModal);
        setOpenSignUpModal(false);
        setNavClick(!navClick);
        document.getElementById("line").style.rotate = "0deg";
        document.getElementById("line2").style.marginTop = "8px";
        document.getElementById("line2").style.rotate = "0deg";
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`fixed z-20 w-full ${navClick && "bg-white"} lg:bg-transparent ${isScrolled && "backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 shadow-md"}`}>
                <div className="container m-auto px-2 md:px-12 lg:px-7">
                    <div className={`flex flex-wrap justify-between items-center py-3 ${navClick && "gap-6"} lg:gap-6 md:py-4 md:gap-0`}>
                        <div className="w-full px-6 flex justify-between items-center lg:w-max md:px-0">
                            <Link to={"/"} aria-label="logo" className="flex space-x-2 items-center">
                                <img src={Logo} className='w-12' alt="logo" />
                                <span className="text-2xl font-bold text-yellow-900">Food <span className="text-yellow-700">Gallery</span></span>
                            </Link>

                            <button onClick={handleClick} aria-label="humburger" id="hamburger" className="relative w-10 h-10 -mr-2 lg:hidden">
                                <div aria-hidden="true" id="line" className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transtion duration-300"></div>
                                <div aria-hidden="true" id="line2" className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transtion duration-300"></div>
                            </button>
                        </div>

                        <div className={`${navClick ? "scale-100 h-full p-6 md:mt-12" : "scale-0 h-0"} lg:mt-0 origin-top transition-all w-full lg:scale-100  lg:flex flex-wrap justify-end items-center space-y-6  rounded-xl  bg-yellow-100 lg:space-y-0 lg:p-0 lg:flex-nowrap lg:bg-transparent lg:w-7/12`}>
                            <div className="text-gray-600 lg:pr-4">
                                <ul className="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0 text-nowrap">
                                    <li>
                                        <Link onClick={handleClick} to={"/categories"} className="block md:px-4 transition hover:text-yellow-700 focus:text-yellow-700">
                                            All Categories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleClick} to={"/country"} className="block md:px-4 transition hover:text-yellow-700 focus:text-yellow-700">
                                            Country
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleClick} to={"/new_recipes"} className="block md:px-4 transition hover:text-yellow-700 focus:text-yellow-700">
                                            New Recipes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleClick} to={""} className="block md:px-4 transition hover:text-yellow-700 focus:text-yellow-700">
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l md:text-nowrap">
                                <button onClick={handleOpenSignUpForm} type="button" title="Sign Up" className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max">
                                    <p className="block text-yellow-800 font-semibold text-sm">
                                        Sign up
                                    </p>
                                </button>
                                <button onClick={handleOpenSignInForm} type="button" title="Login" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max">
                                    <p className="block text-yellow-900 font-semibold text-sm">
                                        Sign in
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <SignInForm open={openSignInModal} setOpen={setOpenSignInModal} />
            <SignUpForm open={openSignUpModal} setOpen={setOpenSignUpModal} />
        </>
    );
};

export default Header;
