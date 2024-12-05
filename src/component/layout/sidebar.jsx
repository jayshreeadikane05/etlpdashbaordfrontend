import React from 'react';
import Cookies from 'js-cookie';
import { Link,useLocation } from 'react-router-dom';
const Sidebar = () => {
  const username = Cookies.get('username') || 'Guest';
  const role = Cookies.get('role') || 'Member'; 
  const location = useLocation();
  const currentPath = location.pathname;
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href=""><img src="assets/images/VM-Horizontal-Logo.png" alt="logo"/></a>
          <a className="sidebar-brand brand-logo-mini" href=""><img src="assets/images/VM-Horizontal-Logo.png" alt="logo"/></a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt="" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">{username}</h5>
                  <span>{role}</span>
                </div>
              </div>
              <a href="#" id="profile-dropdown" data-toggle="dropdown"><i className="mdi mdi-dots-vertical"></i></a>
              <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">Menu</span>
          </li>
          <li
            className={`nav-item menu-items ${
              currentPath === '/dashboard' ? 'active' : ''
            }`}
          >
            <Link className="nav-link" to="/dashboard">
          
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">Dashboard</span>
              </Link>
          </li>
          <li
            className={`nav-item menu-items ${
              currentPath === '/email-template' ? 'active' : ''
            }`}
          >
          <Link className="nav-link" to="/email-template">
          
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title">Email template</span>
          </Link>
          </li>
         
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
    )
}
export default Sidebar;