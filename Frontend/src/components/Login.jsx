import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        formData
      );
      if (response.data.token) {
        console.log("Login successful:", response.data);
        
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        dispatch(login(response.data.data)); // Assuming you have a login action in your Redux store
        navigate("/");
      } else {
        console.error("Login failed: No token received");
        toast.error("Login failed: Check your credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 shadow p-6">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block min-w-[250px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block min-w-[250px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </form>
  );
};

export default Login;
