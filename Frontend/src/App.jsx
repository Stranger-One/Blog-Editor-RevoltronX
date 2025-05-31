import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";

const App = () => {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      // Example: dispatch login action with decoded user info
      // Replace with your actual dispatch logic if using Redux or Context
      // dispatch(login(decoded));
      console.log("User info from token:", decoded);
      dispatch(login(decoded));
    }
  }, [token]);

  useEffect(() => {
    if (!token && !pathname.includes("auth")) {
      navigate("/auth/login");
    } else if (token && pathname.includes("auth")) {
      navigate("/");
    } else {
      // Optionally, you can add any additional logic here
    }
  }, [pathname, token, navigate]);

  return (
    <div className="">
      <Header />
      <div className="mt-16 p-4">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
