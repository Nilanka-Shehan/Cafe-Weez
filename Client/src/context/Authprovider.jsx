import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL

  //Login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${baseURL}/user/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("access-token", data.token);
        setUser(data.user);
        window.location.href = "/";
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  //google login
  const googleLogin = async (response) => {
    const { credential } = response;

    if (!credential) {
      console.error("Google login failed: Missing credential.");
      return {
        success: false,
        message: "Google login failed: Missing credential.",
      };
    }

    try {
      const { data } = await axios.post(
        `${baseURL}/user/google-login`,
        {
          token: credential, // Send credential as token
        }
      );

      if (data.success) {
        console.log(data);
        localStorage.setItem("access-token", data.token);
        setUser(data.user);
        return data;
      } else {
        console.error("Google login failed:", data.message);
        return data;
      }
    } catch (error) {
      console.error(
        "Error during Google login:",
        error.response?.data || error.message
      );
      return { success: false, message: "Google login failed." };
    }
  };

  //signup
  const signup = async (username, email, password, role) => {
    try {
      const { data } = await axios.post(`${baseURL}/user/signup`, {
        username,
        email,
        password,
        role,
      });
      setUser(data.user);
      if (data.success) {
        return login(email, password);
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup Faild",
      };
    }
  };

  //logout
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("access-token");
    localStorage.removeItem("persist:card");
  };

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access-token");
      if (token) {
        try {
          const { data } = await axios.get(`${baseURL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (data.success) {
            setUser(data.user);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error fetching user : ", error.message);
          localStorage.removeItem("access-token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const authInfo = {
    user,
    login,
    signup,
    logout,
    loading,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <div>Loading...</div> : children} {/* Added loading check */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
