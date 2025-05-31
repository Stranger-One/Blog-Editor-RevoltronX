import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      <Toaster/>
    </div>
  );
};

export default App;
