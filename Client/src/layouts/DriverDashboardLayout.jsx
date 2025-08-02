import DriverNavbar from "../components/driver/DriverNavbar";
import { Outlet } from "react-router-dom";

const DriverDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DriverNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DriverDashboard;
