import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className='flex justify-evenly items-center gap-6 mx-auto px-6 mt-32 md:px-12  lg:px-7 text-center py-[2%] bg-yellow-50 border-t-2 text-sm  text-gray-500'>
            <ul className='flex justify-center items-center flex-wrap gap-6 text-xl'>
                <li><Link to={"https://www.facebook.com/Reniel.Mababa.28"}><i className="fa-brands fa-facebook hover:text-yellow-900"></i></Link></li>
                <li><Link to={"https://github.com/Mabsrencode"}><i className="fa-brands fa-github hover:text-yellow-900"></i></Link></li>
                <li><Link to={"https://www.linkedin.com/in/reniel-george-mababa-96a1a223b/"}><i className="fa-brands fa-linkedin hover:text-yellow-900"></i></Link></li>
            </ul>
            <p>{date} &copy;Mabsrencode</p>
        </footer>
    )
}

export default Footer