import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logoimage from "../images/Logo.png"

import './Navbar.css';
import {
    FaHome,
    FaSearch,
    FaShoppingBag,
    FaHeart,
    FaSignOutAlt,
    FaTimes,
    FaBars,
} from 'react-icons/fa';

const Navbar = () => {

    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("logged");
        navigate('/');
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // let userlogin = JSON.parse(localStorage.getItem("currentuser"))

    return (
        <>
            <header className="navbar1">
                <div className="navbar-left">
                    <Link to="/home"><img src={logoimage} alt="Logo" className="logo" /></Link>
                </div>

                <div className="hamburger" onClick={toggleSidebar}>
                    <FaBars className={`icon ${isSidebarOpen ? 'hide' : ''}`} />
                    <FaTimes className={`icon ${isSidebarOpen ? 'show' : 'hide'}`} />
                </div>

                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h3 className="Hel">
                            {/* Hi <span className="Username">{userlogin.name}</span>, */}
                        </h3>

                    </div>
                    <div className="search-container">
                    </div>
                    <ul className="sidebar-menu">
                        <Link to='/home' className='text-decoration-none text-black'> <li><i class="fa-solid fa-house icon"></i> Home</li></Link>
                        <Link className='text-decoration-none text-black' to="/orders"><li><i class="fa-solid fa-bag-shopping icon"></i>All Orders </li></Link>
                        <Link className='text-decoration-none text-black' to="/bill"><li><i class="fas fa-file-invoice icon"></i> Order Receipt</li></Link>
                        <Link className='text-decoration-none text-black' to="/addproduct"><li><i class="fa-solid fa-store icon"></i> Add New Product</li></Link>
                        <button onClick={logout} id="li" className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </button>
                    </ul>
                </div>
            </header>
        </>
    );
};

export default Navbar;
