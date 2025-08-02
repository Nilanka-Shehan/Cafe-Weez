import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavBar";
import Adminsidebar from "../components/admin/Adminsidebar";

const AdminDashboardLayout = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <AdminNavbar />

        <main className="flex-1 bg-gray-100 flex">
          <Adminsidebar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
