import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (msg) =>
    Swal.fire({
      title: msg,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
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
    try {
      const response = await login(email, password);
      console.log(response);
      if (response.success) {
        handleSuccess(response.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message);
      } else if (error.request) {
        console.error("No response from the server", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-raw h-screen">
      <div className="hidden md:block h-full w-1/3 bg-white">
        <img src="/other/food2.jpeg" alt="" className="h-screen w-full" />
      </div>
      <div className="flex items-center justify-center h-screen px-10 md:px-0 md:w-2/3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-sm md:w-3/4 p-4 bg-white rounded-md shadow-md"
        >
          <div className="flex justify-end">
            <Link to={"/"}>
              <button className="rounded-full bg-gamboge w-6 text-white hover:bg-black">
                X
              </button>
            </Link>
          </div>
          <h2 className="text-center text-black font-semibold mb-4">Login</h2>
          <div className="form-data mb-4">
            <label htmlFor="email" className="text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={handleOnChange}
              className="bg-gray-100 p-2 rounded-md w-full"
            />
          </div>
          <div className="form-data mb-4">
            <label htmlFor="password" className="text-secondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your Password"
              onChange={handleOnChange}
              className="bg-gray-100 p-2 rounded-md w-full"
            />
          </div>
          <Link to={"#"} className="text-secondary text-sm mb-4">
            Forget password?
          </Link>
          <span className="text-secondary mt-2 mb-4">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-blue-600">
              Signup
            </Link>
          </span>
          <button
            type="submit"
            className="btn bg-gamboge rounded-full text-white py-2 px-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
