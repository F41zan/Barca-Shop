import React, { useEffect, useRef, useState } from "react";
import "../../UI/AdminUI/AdminSidebar.scss";
import adminLogo from "../../../assets/img/admin-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCartShopping, faFolderOpen, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({ showMenu, isCollapse, setIsCollapse, setShowMenu }) => {
  const [isMob, setIsMob] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 786) {
        setIsMob(true);
        setIsCollapse(false);
      } else {
        setIsMob(false);
      }
    };
    handleResize(); //run once in start so we will know is it less than 786px or more
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`admin-sidebar ${isCollapse ? "sidebar-collapse" : ""}  ${
        showMenu ? "side-active" : ""
      }`}
    >
      <div className="upper">
        <div className="logo">
          <div className="logo-container" onClick={()=>navigate('/admin')}>
            <img src={adminLogo} alt="" />
            <div className="img-desc">
              <h3>FC Barcelona</h3>
              <p>Admin Panel</p>
            </div>
            {isMob && (
              <i className="ri-close-fill" onClick={() => setShowMenu(false)}></i>
            )}
          </div>
          <hr />
        </div>

        <div className="page-navigations">
          <NavLink end to="/admin" className="nav-link">
           {({isActive})=>(

          <div className={`page ${isActive?"active":""}`}>
            <div className="page-header">
              <div className="icon-wrapper">
                <i className="ri-bar-chart-line"></i>
              </div>
              <div className="page-name">Dashboard</div>
            </div>
            <div className={`dot ${isActive?"active-dot":""}`}></div>
          </div>
            )}
          </NavLink>
          <NavLink to="users" className="nav-link">
            {({isActive})=>(

          <div className={`page ${isActive?"active":""}`}>
            <div className="page-header">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="page-name">Users</div>
            </div>
            <div className={`dot ${isActive?"active-dot":""}`}></div>
          </div>
            )}
          </NavLink>

           <NavLink to="adminProducts" className="nav-link">
            {({isActive})=>(
          <div className={`page ${isActive?"active":""}`}>
            <div className="page-header">
              <div className="icon-wrapper">
               <FontAwesomeIcon icon={faFolderOpen} />
              </div>
              <div className="page-name">Products</div>
            </div>
            <div className={`dot ${isActive?"active-dot":""}`}></div>
          </div>
            )}
          </NavLink>
           <NavLink to="orders" className="nav-link">
            {({isActive})=>(
          <div className={`page ${isActive?"active":""}`}>
            <div className="page-header">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faCartShopping} /> 
              </div>
              <div className="page-name">Orders</div>
            </div>
            <div className={`dot ${isActive?"active-dot":""}`}></div>
          </div>
            )}
          </NavLink>
            
        </div>
      </div>

      <div className="sidebar-footer">
        <hr />
        <div className="admin-info" >
          <div className="img-wrapper">
            {/* <img className="admin-img" alt='faizan'/> */}
            <h3 className="first-word">A</h3>
          </div>
          <div className="admin-name">
            <h4>Admin User</h4>
            <p>Administrator</p>
          </div>
        </div>
        <button
          className="collapse-btn"
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <i className="ri-arrow-left-s-line"></i>
          <h3>Collapse</h3>
        </button>
        <button
          className="logout-btn"
          onClick={() => navigate('/')}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon"/>
          <h3>Logout</h3>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
