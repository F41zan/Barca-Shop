import React from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/","/login","/register"];
  const hideFooters = hideFooterRoutes.includes(location.pathname);
  return (
    <div>
      <Navbar/>
      <Outlet/>
    { !hideFooters && <Footer/>}
    </div>
  )
}

export default Layout
