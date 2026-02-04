import Products from "../../component/UX/Products";
import AdminDashboard from "../../Pages/Admin/UX/AdminDashboard";
import AdminOrder from "../../Pages/Admin/UX/AdminOrder";
import AdminProducts from "../../Pages/Admin/UX/AdminProducts";
import Users from "../../Pages/Admin/UX/Users";

export const adminRoutes = [
   { path: "", element: <AdminDashboard /> },           // /adminDashboard
    { path: "users", element: <Users /> }, 
    { path: "adminProducts", element: <AdminProducts /> }, 
    { path: "orders", element: <AdminOrder/> }, 
]