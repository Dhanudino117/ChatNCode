import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; // icons

import axios from "../config/axios.js";
import { useUser } from "../context/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ prevent form refresh
    axios
      .post("/user/login", { email, password })
      .then((res) => {
        login(res.data.user, res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please check your credentials and try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-white mb-3">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Please login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-900/70  border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-900/70  border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       hover:from-blue-500 hover:to-indigo-500 
                       transition duration-300 shadow-lg 
                       hover:shadow-blue-500/40 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Don’t have an account?
            <Link to="/register">
              <span className="text-blue-400 hover:text-blue-300 font-medium transition duration-200">
                Create One
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
