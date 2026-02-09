import {Navigate, Outlet} from 'react-router-dom';
const ProtectedRoutes = ({role}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user || !user.role){
        alert("Please register first")
        return <Navigate to="/Login"/>
    }
    if(role && user.role!==role){
        alert("Please register first") 
        return <Navigate to='/Login'/>
    }
    
  return <Outlet/>;
}

export default ProtectedRoutes
