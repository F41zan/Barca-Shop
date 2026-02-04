import React from 'react'
import {useNavigate,Navigate, Outlet} from 'react-router-dom';
const ProtectedRoutes = ({role}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user || !user.role){
        alert("pls register first")
        console.log("react ")
        return <Navigate to="/Login"/>
    }
    if(role && user.role!==role){
        alert("pls register first") 
        console.log("react ")
        return <Navigate to='/Login'/>
    }
    
  return <Outlet/>;
}

export default ProtectedRoutes
