import React from "react";
import Landing from "../../Pages/User/UX/Landing";
import Kits from "../../Pages/User/UX/ProductCollection";
import Products from "../../component/UX/Products";
import ProductDetail from "../../Pages/User/UX/ProductDetail";
import CartDetails from "../../Pages/User/UX/CartDetails";
import PlaceOrder from "../../Pages/User/UX/PlaceOrder";
import ViewOrder from "../../Pages/User/UX/ViewOrder";

export const userRoutes = [
  { path: "/Landing", element: <Landing /> },
  { path: "/Kits", element: <Kits category="kits" /> },
  { path: "/product/:id", element: <Products /> },
  { path: "/Apparel", element: <Kits category="Apparel" /> },
  { path: "/productDetail", element: <ProductDetail /> },
  { path: "/CartOrder", element: <CartDetails /> },
  { path: "/PlaceOrder", element: <PlaceOrder /> },
  { path: "/viewOrder", element: <ViewOrder /> },
];
