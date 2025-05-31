import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isAuthenticated = true; // For demonstration purposes, set to true

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Optionally, you can dispatch a logout action here
    navigate("/auth/login");
  }

  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 z-50">
      <h1 className="text-2xl font-bold">RevoltronX</h1>

      <div className="">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <p>
              <strong>Email: </strong> test@gmail.com{" "}
            </p>
            <button onClick={handleLogout} className="border border-white px-4 py-1 rounded-md cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="border border-white px-4 py-1 rounded-md cursor-pointer"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="border border-white px-4 py-1 rounded-md cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
