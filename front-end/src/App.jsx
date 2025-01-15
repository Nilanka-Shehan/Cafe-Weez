import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import Main from "./layouts/Main";
import OrderDashboardLayout from "./layouts/OderDashboardLayout";
import About from "./pages/about/About";
import AddMenu from "./pages/AdminDashBoard/admin/AddMenu";
import CustomerSupport from "./pages/AdminDashBoard/admin/CustomerSupport";
import Dashboard from "./pages/AdminDashBoard/admin/DashBoard";
import ManageBookings from "./pages/AdminDashBoard/admin/ManageBookings";
import ManageItems from "./pages/AdminDashBoard/admin/ManageItems";
import UpdateMenu from "./pages/AdminDashBoard/admin/UpdateMenu";
import Users from "./pages/AdminDashBoard/admin/Users";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import CartPage from "./pages/menu/CartPage";
import Menu from "./pages/menu/Menu";
import Signup from "./pages/SignUp";

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
        element: <Contact/>,
      },
      {
        path: "/cart-page",
        element: <CartPage/>,
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
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "update-menu/:menuId",
        element: <UpdateMenu />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings/>
      },
      {
        path:"customer-support",
        element:<CustomerSupport/>,
      },
    ],
  },
  {
    path:"order-dashboard",
    element:<OrderDashboardLayout/>,
    // children:[
    //   {
    //     path: "order-details",
    //     element: <OrderDetails />,
    //   },
    // ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
