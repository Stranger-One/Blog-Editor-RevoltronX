import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        formData
      );
      if (response.data.token) {
        console.log("Login successful:", response.data);

        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        dispatch(login(response.data.data)); // Assuming you have a login action in your Redux store
        navigate("/");
      } else {
        console.error("Registration failed: No token received");
        toast.error("Registration failed: Check your credentials");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed: " + error.response?.data?.message || "An error occurred");
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 shadow p-6">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            type="text"
            id="fullname"
            name="fullname"
            required
            className="mt-1 block min-w-[250px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
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
          Register
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default Register;
