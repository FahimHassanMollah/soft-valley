import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="mx-3">
                    <img src="../../img/softValley.png" alt="" className='img-fluid' />
                </div>
            </Link>
            <li className="nav-item">
                <Link className="nav-link"  to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>
        </ul>
    )
}
export default Sidebar