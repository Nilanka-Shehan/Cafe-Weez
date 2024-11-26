import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("access-token", data.token);
        setUser(data.user);
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

  //signup
  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post("http://localhost:3001/user/signup", {
        username,
        email,
        password,
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
  };

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access-token");
      if (token) {
        try {
          await axios.get("http://localhost:3001/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          console.error("Error fetching user : ", error.message);
          logout();
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
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

