import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAth";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputValue;
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
    if (!email || !username || !password) {
      return handleError("All fields are required");
    }

    //setLoading(true)=========

    try {
      const response = await signup(username, email, password);
      if (response.success) {
        handleSuccess(response.message);
        const loginResponse = await login(email, password);
        if (loginResponse.success) {
          console.log(loginResponse.user);
          navigate("/");
        } else {
          handleError(loginResponse.message);
        }
      } else {
        handleError(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false)
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        username: "",
      });
    }
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
          <h2 className="text-center text-black font-semibold">
            Create an Account
          </h2>
          <div className="form-data">
            <label htmlFor="username" className="text-secondary">
              UserName
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              placeholder="Enter your UserName"
              onChange={handleOnChange}
              className="bg-white"
            />
          </div>
          <div className="form-data">
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
              className="bg-white"
            />
          </div>
          <div className="form-data">
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
              className="bg-white"
            />
          </div>
          <span className="text-secondary mt-10">
            Have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </span>
          <button
            type="submit"
            className="btn bg-gamboge rounded-full text-white"
          >
            SignIn
          </button>
          {/* <button
            type="submit"
            className="btn bg-gamboge rounded-full text-white"
            disabled={loading}
          >
            {loading ? "Signing up..." : "SignUp"}
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
