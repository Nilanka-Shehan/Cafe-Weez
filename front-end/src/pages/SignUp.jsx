import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAth";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, login, loading } = useAuth();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const { username, email, password, confirmPassword } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (msg) =>
    Swal.fire({
      title: "Error",
      text: msg,
      icon: "error",
      confirmButtonText: "OK",
    });

  const handleSuccess = (msg) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return handleError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return handleError("Passwords do not match.");
    }

    // setIsLoading(true);
    try {
      const response = await signup(username, email, password);

      if (response.success) {
        handleSuccess(response.message);

        const loginResponse = await login(email, password);
        if (loginResponse.success) {
          navigate("/");
        } else {
          handleError(loginResponse.message);
        }
      } else {
        handleError(response.message);
      }
    } catch (error) {
      console.error(error);
      handleError("Signup failed. Please try again.");
    } finally {
      // setIsLoading(false);
      setInputValue({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C73659]">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column (Image) */}
        <div className="flex justify-center items-center">
          <img
            src="/logo.jpg"
            alt="Company Logo"
            className="max-w-[300px] w-full h-auto"
          />
        </div>

        {/* Right column (Form) */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={username}
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full mt-1 p-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={confirmPassword}
                onChange={handleOnChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#C73659] rounded-md text-white hover:bg-[#A91D3A] transition-colors"
              // disabled={isLoading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
