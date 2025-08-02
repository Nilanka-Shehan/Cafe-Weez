import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import Main from "./layouts/Main";
import About from "./pages/about/About";
import MenuManagementDashboard from "./pages/AdminDashBoard/admin/MenuManagementDashboard";
import OrderManagementDashboard from "./pages/AdminDashBoard/admin/OderManagementDashboard";
import UsermanagementDashboard from "./pages/AdminDashBoard/admin/UsermanagementDashboard";
import UserreviewsDashboard from "./pages/AdminDashBoard/admin/UserreviewsDashboard";
import CartPage from "./pages/cart/CartPage";
import Contact from "./pages/contact/Contact";
import Customer from "./pages/customer/Customer";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Menu from "./pages/menu/Menu";
import Signup from "./pages/SignUp";
import DriverDashboardLayout from "./layouts/DriverDashboardLayout";
import DriverDashboard from "./pages/DriverDashboard/DriverDashboard";
import AssignOrders from "./pages/AdminDashBoard/admin/AssignOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "order-management-dashboard",
        element: <OrderManagementDashboard />,
      },
      {
        path: "assign-orders",
        element: <AssignOrders />,
      },
      {
        path: "menu-management-dashboard",
        element: <MenuManagementDashboard />,
      },
      {
        path: "user-management",
        element: <UsermanagementDashboard />,
      },
      {
        path: "user-reviews-dashboard",
        element: <UserreviewsDashboard />,
      },
    ],
  },

  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/driver-dashboard",
    element: <DriverDashboardLayout />,
    children: [
      {
        path: "/driver-dashboard",
        element: <DriverDashboard />,
      },
    ],
  },
  // {
  //   path: "order-dashboard",
  //   element: <OrderDashboardLayout />,
  //   // children:[
  //   //   {
  //   //     path: "order-details",
  //   //     element: <OrderDetails />,
  //   //   },
  //   // ]
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
