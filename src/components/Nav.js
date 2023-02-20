import React from 'react'
import { useSelector } from 'react-redux';

const Nav = () => {
    const { user } = useSelector(state => state.auth)
    const logoutHandler = () => {
        localStorage.removeItem('auth');
        window.location.href = '/login';
    }
    
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
           
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <div className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.name ?? ''}</span>
                        <img className="img-profile rounded-circle" src="../../img/undraw_profile.svg"  alt=''/>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                    
                        <button className="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </button>
                    </div>
                </li>
            </ul>
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>
    )
}

export default Nav