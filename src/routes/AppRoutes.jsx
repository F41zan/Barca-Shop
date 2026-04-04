import {  Routes, Route, } from "react-router-dom";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import Layout from "../component/UX/Layout";
import "react-toastify/dist/ReactToastify.css";
import { publicRoutes } from "../routes/Config/publicRoutes";
import { userRoutes } from "../routes/Config/userRoutes";
import { adminRoutes } from "../routes/Config/adminRoutes";
import AdminLayout from "../component/UX/Admin/AdminLayout";
import NotFound from "../component/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
        {/* public Route*/}
        <Route path="/" element={<Layout />}>
                <Route path="*" element={<NotFound/>} />
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Protected Route for user*/}
          <Route element={<ProtectedRoutes role="user" />}>
            {userRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* Protected Route for admin*/}
        <Route element={<ProtectedRoutes role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
  )
}

export default AppRoutes
