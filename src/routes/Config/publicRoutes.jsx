import Login from "../../Pages/User/UX/Login";
import Register from "../../Pages/User/UX/Register";

export const publicRoutes = [
  {path:"/",element:<Login/>},
  {path:"/Login",element:<Login/>},
  {path:"/register",element:<Register/>},
]