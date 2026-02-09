import { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSIdebar'
import '../../UI/AdminUI/AdminLayout.scss';

const AdminLayout = () => {
  const [showMenu,setShowMenu] = useState(false);
  const [isCollapse,setIsCollapse] = useState(false);
  
  return (
    <div className='admin-layout'>
       {showMenu && (
        <div 
          className="backdrop" 
          onClick={() => setShowMenu(false)}
        />
      )}
      <AdminSidebar isCollapse={isCollapse} setIsCollapse={setIsCollapse} showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="admin-content">
      <AdminNavbar isCollapse={isCollapse} setIsCollapse={setIsCollapse} setShowMenu={setShowMenu} showMenu={showMenu} />
      <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout;
