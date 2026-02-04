import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/User/UX/Register";
import Login from "./Pages/User/UX/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Landing from "./Pages/User/UX/Landing";
import AdminDashboard from "./Pages/Admin/UX/AdminDashboard";
import Layout from "./component/UX/Layout";
import { ToastContainer } from "react-toastify";
import Kits from "./Pages/User/UX/ProductCollection";
import ProductDetail from "./Pages/User/UX/ProductDetail";
import CartDetails from "./Pages/User/UX/CartDetails";
import PlaceOrder from "./Pages/User/UX/PlaceOrder";
import ViewOrder from "./Pages/User/UX/ViewOrder";
import Products from "./component/UX/Products";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./Helper/ScrollToTop";
import { publicRoutes } from "./routes/Config/PublicRoutes";
import { userRoutes } from "./routes/Config/UserRoutes";
import { adminRoutes } from "./routes/Config/AdminRoutes";
import AdminLayout from "./component/UX/Admin/AdminLayout";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      {/* <Routes> */}
        {/* public Route*/}
        {/* <Route path="/" element={<Layout />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))} */}

          {/* Protected Route for user*/}
          {/* <Route element={<ProtectedRoutes role="user" />}>
            {userRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route> */}

        {/* Protected Route for admin*/}
        {/* <Route element={<ProtectedRoutes role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route> */}
      {/* </Routes> */}
      <AppRoutes/>
    </>
  );
};

export default App;
