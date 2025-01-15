import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAth";
import useRoleCheck from "../hooks/useRoleCheck";

const Profile = ({ user }) => {
  const { logout } = useAuth();
  const [hasAccess, isLoading, isError] = useRoleCheck(["admin", "cashier"]);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL &&
                (user.photoURL.startsWith("http") ? (
                  <img alt="User Avatar" src={user.photoURL} />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 bg-gamboge rounded-full">
                    <span className="text-lg font-bold text-white">
                      {user.photoURL}
                    </span>
                  </div>
                ))}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <a href="*">Profile</a>
            </li>
            <li>
              <a href="*">Order</a>
            </li>
            <li>
              <a href="*">Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            {isLoading ? (
              <li>Loading...</li>
            ) : isError ? (
              <li>Error loading role</li>
            ) : (
              <>
                {user.role === "admin" && (
                  <>
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                      <a href="/order-dashboard">Order Details</a>
                    </li>
                  </>
                )}
                {user.role === "cashier" && (
                  <li>
                    <a href="/order-dashboard">Order Details</a>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    role: PropTypes.string.isRequired, // Ensure role is provided
  }).isRequired,
};

export default Profile;
