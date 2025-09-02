import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/auth/login", formData, { withCredentials: true });
      setSuccess("Login successful ✅");
      console.log("Response:", res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
      navigate("/");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-white to-green-200">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side (Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="text-gray-600 mb-6">
            Login to access your travelwise account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@gmail.com"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                Remember me
              </label>
              <a href="#" className="text-red-500 hover:underline">
                Forgot Password
              </a>
            </div>

            {/* Error & Success */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Signup */}
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <a href="#" className="text-red-500 hover:underline">
                Sign up
              </a>
            </p>

            {/* Social Login */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-sm text-gray-500">Or login with</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="p-2 border rounded-full hover:bg-gray-100"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 border rounded-full hover:bg-gray-100"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 border rounded-full hover:bg-gray-100"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/731/731985.png" alt="Apple" className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right side (Image & Welcome) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-green-200 via-white to-purple-200 items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Welcome Back!</h2>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-10243352-8292114.png"
              alt="Login illustration"
              className="w-80 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
