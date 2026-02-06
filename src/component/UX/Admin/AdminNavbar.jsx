import React, { useEffect, useRef, useState } from "react";
import "../../UI/AdminUI/AdminNavbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {  NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = ({ setShowMenu, showMenu, isCollapse }) => {
  const [showOpt,setShowOpt] = useState(false);
  const navigate = useNavigate();
  const optionRef = useRef();

  useEffect(()=>{
    const handleClickOutside = (e) =>{
      if(optionRef.current && !optionRef.current.contains(e.target)){
        setShowOpt(false);
      }
    }
    window.addEventListener('mousedown',handleClickOutside);
  },[showOpt]);
  return (
    <section
      className={`admin-navbar  ${isCollapse ? "sidebar-collapse" : ""}`}
    >
      <div className="nav-content">
        <div className="nav-header">
          <div className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
            <i class="ri-menu-fold-fill"></i>
          </div>
          <hr />
          <div className="head">
            <h3>Dashboard</h3>
            <p>Manage Your FC Barcelona store efficienty</p>
          </div>
        </div>
        <div className={`${showOpt?"not-hover":""} admin-info `} onClick={()=>setShowOpt(!showOpt)}>
          <div className="img-wrapper">
            {/* <img className="admin-img" alt='faizan'/> */}
            <h3 className="first-word">A</h3>
          </div>
          <div className="admin-name">
            <h4>Admin User</h4>
            <p>Administrator</p>
          </div>
            <div  className={`${showOpt ? "show-opt" : ""} setting-options`} ref={optionRef} >
              <ul className="opt">
                <li className="">
                  <FontAwesomeIcon icon={faUser}  className="icon"/> Profile
                </li>
                <li className="">
                  <FontAwesomeIcon icon={faGear} className="icon" /> Settings
                </li>
                <li className="" onClick={()=>navigate('/')}> 
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" /> Logout
                </li>
              </ul>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AdminNavbar;
