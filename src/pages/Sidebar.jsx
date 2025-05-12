import React from 'react';
import { FaSearch } from "react-icons/fa";
import { RiFolder6Fill } from "react-icons/ri";
import { HiMap } from "react-icons/hi";
import { GiStoneSphere } from "react-icons/gi";
import { BsStack } from "react-icons/bs";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, NavLink, Outlet } from 'react-router-dom';
// import './css/Navbar.css';
import './css/Sidebar.css';

function NavbarWithSidebar() {
    return (
        <>
            <div className='container-body'>
                <div className='Navbar_body'>
                    <nav className="nav">
                        <div className="logo">
                            <span className='nav-menu'>C</span>
                            <img className='logo-img' src="logo.jpg" alt="Logo" />
                            <span className='logo-name h4'>Tourist</span>
                        </div>
                        <div className="menu" id="menu">
                            <span className='nav-user'>User Name</span>
                            <span className='nav-search'>
                                <FaSearch />
                            </span>
                        </div>
                    </nav>

                    {/* Sidebar */}
                    <div className="sidebar">
                        <div className="sidebar-menu">
                            <div className="top-icons">
                                <div className='sidebar-icon'><NavLink to="/" className={({ isActive }) =>
                                    isActive ? 'sidebar-link active' : 'sidebar-link'
                                } ><RiFolder6Fill className='sidebar-i' /></NavLink></div>
                                <div className='sidebar-icon'><NavLink to="/about" className={({ isActive }) =>
                                    isActive ? 'sidebar-link active' : 'sidebar-link'
                                }><HiMap className='sidebar-i' /></NavLink></div>
                                <div className='sidebar-icon'><NavLink to="/contact" className={({ isActive }) =>
                                    isActive ? 'sidebar-link active' : 'sidebar-link'
                                }><BsStack className='sidebar-i' /></NavLink></div>
                                <div className='sidebar-icon'><NavLink to="/contact" className={({ isActive }) =>
                                    isActive ? 'sidebar-link active' : 'sidebar-link'
                                }><GiStoneSphere className='sidebar-i' /></NavLink></div>
                                <div className='sidebar-icon'><NavLink to="/contact" className={({ isActive }) =>
                                    isActive ? 'sidebar-link active' : 'sidebar-link'
                                }><FaCanadianMapleLeaf className='sidebar-i' /></NavLink></div>
                            </div>
                            <div className="bottom-icon">
                                <div className='sidebar-icon'><Link to="/settings" className={({ isActive }) =>
                                    isActive ? 'sidebar-link active' : 'sidebar-link'
                                }><IoSettingsSharp className='sidebar-i' /></Link></div>
                            </div>
                        </div>

                        <div className="sidebar-men">
                            <p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, reiciendis illo, est dignissimos minima vero nesciunt blanditiis veniam minus modi magnam aspernatur aperiam ratione fugit expedita obcaecati, et labore. Quos repellendus ab veritatis, nostrum quisquam error reiciendis est libero sequi quia, corrupti voluptas rerum tempore, tempora eaque totam illum voluptate accusantium culpa magnam minima alias accusamus fugiat odit? Quis molestiae, obcaecati dolores, tempore esse cumque eos quo, sequi sed voluptatibus deserunt explicabo iste id quas. At, minus ipsum nostrum dicta rem, impedit animi non, aspernatur harum tenetur repellat voluptas. Expedita possimus harum perspiciatis exercitationem nesciunt eius reiciendis distinctio maxime error!                        </div>

                        <div className="sidebar-content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default NavbarWithSidebar;
