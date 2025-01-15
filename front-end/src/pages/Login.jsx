import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAth";
import useRoleCheck from "../hooks/useRoleCheck";

const Login = () => {
  const navigate = useNavigate();
  const allowedRoles = ["admin", "cashier", "user", "owner"];
  const { login, user, logout, loading, googleLogin } = useAuth();
  const [hasAccess, role, isRoleCheckLoading, isError, refetch] = useRoleCheck(allowedRoles);
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  useEffect(() => {
    if (role) {
      handleNavigation();
    }
  }, [role]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (msg) => {
    Swal.fire({
      title: msg,
      icon: "error",
      showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
      hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" },
    });
  };

  const handleSuccess = (msg) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleNavigation = () => {
    switch (role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "cashier":
        navigate("/order-dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        handleSuccess(response.message);
        refetch();
      } else {
        handleError(response.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      handleError(error.response?.data?.message || "An unexpected error occurred.");
    }
    setInputValue({ email: "", password: "" });
  };

  const handleGoogleSignIn = async (response) => {
    try {
      const result = await googleLogin(response);
      if (result.success) {
        handleSuccess(result.message);
        refetch();
      } else {
        handleError(result.message);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      handleError("Google Sign-In failed.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isRoleCheckLoading) {
    return <div>Loading;...</div>;
  }

  if (isError) {
    return <div>Error occurred while checking roles. Please try again later.</div>;
  }

  return (
    <div className="bg-rose-red min-h-screen flex items-center justify-center relative">
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 text-[#A91D3A] bg-[#EEEEEE] hover:bg-red rounded-full px-4 py-2 shadow-lg transition duration-200"
      >
        Close
      </button>

      <div className="w-full max-w-7xl px-6 lg:px-20 py-45 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Logo */}
        <div className="flex justify-center items-center">
          <img src="/logo.jpg" alt="Company Logo" className="max-w-[300px] w-full h-auto" />
        </div>

        {/* Right Column: Login Form */}
        <div className="flex flex-col justify-center">
          {role ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[#A91D3A]">
                Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}!
              </h2>
              <button
                onClick={handleLogout}
                className="w-full py-2 mt-4 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-center text-[#A91D3A]">
                Login to Your Account
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter your email"
                    className="w-full mt-1 p-3 rounded-md bg-white border border-[#A91D3A] text-black focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter your password"
                    className="w-full mt-1 p-3 rounded-md bg-white border border-[#A91D3A] text-black focus:outline-none focus:ring-2 focus:ring-[#A91D3A]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#A91D3A] text-white rounded-md hover:bg-[#B92D50] transition-colors"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

              <div className="mt-6 flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => handleGoogleSignIn(credentialResponse)}
                  onError={() => handleError("Google Sign-In failed.")}
                  useOneTap
                  theme="outline"
                  shape="circle"
                  width="100%"
                />
              </div>

              <p className="text-center text-sm mt-4">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-[#A91D3A] hover:underline">
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
