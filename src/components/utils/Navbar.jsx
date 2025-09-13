import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-white scale-125 font-semibold' : 'text-gray-400';
    };

    return (
        <nav className='sticky top-0 z-100'>
            <header className="bg-gray-900 text-white body-font ">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer">
                        <span className="ml-3 text-2xl font-semibold"><span className='text-blue-500'>B</span>iswarup's page</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center md:justify-end">
                        <Link to="/" className={`mr-5 hover:text-white cursor-pointer hover:scale-125 transition-all ${isActive('/')}`}>Home</Link>
                        <Link to="/about" className={`mr-5 hover:text-white cursor-pointer hover:scale-125 transition-all ${isActive('/about')}`}>About</Link>
                        <Link to="/projects" className={`mr-5 hover:text-white cursor-pointer hover:scale-125 transition-all ${isActive('/projects')}`}>Projects</Link>
                        <Link to="/contact" className={`mr-5 hover:text-white cursor-pointer hover:scale-125 transition-all ${isActive('/contact')}`}>Get in touch</Link>
                    </nav>
                </div>
            </header>
        </nav>
    );
}

export default Navbar;
