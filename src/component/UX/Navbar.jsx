import React, { useCallback, useState, useEffect, useRef } from "react";
import "../UI/Navbar.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import barca from "../../assets/img/barca.jpg";
import barca1 from "../../assets/img/barca1.png";
import barca2 from "../../assets/img/barca2.png";
import barca3 from "../../assets/img/barca3.png";
import barca4 from "../../assets/img/barca4.png";
import india from "../../assets/img/download (1).png";
import barca5 from "../../assets/img/barca5.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);
  const [sticky, setsticky] = useState();
  const location = useLocation();
  const isLandingPage = location.pathname === "/Landing";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 200 ? setsticky(true) : setsticky(false);
    });
  }, []);
  const handleMenu = useCallback(() => {
    setActiveMenu(!activeMenu);
  }, [activeMenu]);
   const [showOpt,setShowOpt] = useState(false);
    const optionRef = useRef();
  
    useEffect(()=>{
      const handleClickOutside = (e) =>{
        if(!optionRef.current.contains(e.target)){
          setShowOpt(false);
        }
      }
      window.addEventListener('mousedown',handleClickOutside);
    },[showOpt]);

  return (
    <section className={`navbar ${sticky || !isLandingPage ||activeMenu ? "dark" : ""}`}>
      <nav>
        <div className="img-container">
          <i className="ri-menu-2-line" onClick={handleMenu}></i>
          <img
            src="https://store.fcbarcelona.com/cdn/shop/t/9/assets/logo-simple-white.svg?v=15706832919691285971675422275"
            alt="barca"
          />
        </div>
        <div className="menu-list">
          <ul className={activeMenu ? "show-menu" : "hide-menu"}>
            <NavLink to="/Landing" className="nav-link">
              <li>
                <img src={barca} alt="barca0" />
                <div>HOME</div>
              </li>
            </NavLink>
            <NavLink
              to="/Kits"
              className={({ isActive }) => (isActive ? "active" : "nav-link")}
            >
              <li>
                <img src={barca1} alt="barca1" />
                <div>KITS</div>
              </li>
            </NavLink>
            <NavLink
              to="/Apparel"
              className={({ isActive }) => (isActive ? "active" : "nav-link")}
            >
              <li>
                <img src={barca3} alt="barca3" />
                <div>APPAREL</div>
              </li>
            </NavLink>
            <li>
              <img src={barca4} alt="barca4" />
              <div>PLAYER</div>
            </li>
          </ul>
        </div>
        <div className="header-icons">
          <div className="country">
            <div className="sm-circle">
              <img src={india} alt="" />
            </div>
            <span>EN</span>
          </div>
          <FontAwesomeIcon className="icon" icon={faUser} />
          <i
            onClick={() => navigate("/CartOrder")}
            className="ri-shopping-bag-line"
            style={{ color: "#fff" }}
          ></i>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
