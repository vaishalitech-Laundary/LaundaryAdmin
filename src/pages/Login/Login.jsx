import React, { useState } from "react";
import { X, Eye, EyeOff, Link } from "lucide-react";
import google_icon from "../../../public/google_icon.png"
import apple_icon from "../../../public/apple_icon.png"
import facebook_icon from "../../../public/facebook_icon.png"
import { IoChevronBackSharp } from "react-icons/io5";

const Login = () => {
  const [activeForm, setActiveForm] = useState("signup");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    verificationCode: "",
    agreeTerms: false,
  });
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Mock database for demonstration purposes
  const [users, setUsers] = useState([
    {
      email: "test@example.com",
      password: "Test@123",
      firstName: "Test",
      lastName: "User",
      phoneNumber: "1234567890",
    },
  ]);

  // Mock verification codes database
  const [verificationCodes, setVerificationCodes] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const sendVerificationEmail = (email, code) => {
    // In a real application, this would send an email
    console.log(`Sending verification code ${code} to ${email}`);
    setVerificationCodes((prev) => ({
      ...prev,
      [email]: code,
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = () => {
    setLoading(true);
    setError("");

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError("Please enter your first and last name");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    // Check if user exists
    const existingUser = users.find((user) => user.email === formData.email);
    if (existingUser) {
      setError("Email already registered");
      setLoading(false);
      return;
    }

    // Generate and send verification code
    const code = generateVerificationCode();
    sendVerificationEmail(formData.email, code);

    setMessage("Account created successfully! Please verify your email.");
    setActiveForm("verify");
    setLoading(false);
  };

  const handleLogin = () => {
    setLoading(true);
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    setMessage("Login successful!");
    // In a real application, you'd redirect to the dashboard or home page here
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
    setLoading(false);
  };

  const handleForgotPassword = () => {
    setLoading(true);
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const user = users.find((user) => user.email === formData.email);
    if (!user) {
      setError("No account found with this email");
      setLoading(false);
      return;
    }

    const code = generateVerificationCode();
    sendVerificationEmail(formData.email, code);

    setMessage("Verification code sent to your email");
    setActiveForm("verify");
    setLoading(false);
  };

  const handleVerification = () => {
    setLoading(true);
    setError("");

    const storedCode = verificationCodes[formData.email];
    if (!storedCode || formData.verificationCode !== storedCode) {
      setError("Invalid verification code");
      setLoading(false);
      return;
    }

    setVerificationSuccess(true);
    setLoading(false);
  };

  const handleContinueToSetPassword = () => {
    setVerificationSuccess(false);
    setShowSetPassword(true);
    setActiveForm("setPassword");
  };

  const handleSetPassword = () => {
    setLoading(true);
    setError("");

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Update user password
    setUsers(
      users.map((user) =>
        user.email === formData.email
          ? { ...user, password: formData.password }
          : user
      )
    );

    setMessage("Password updated successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
    setLoading(false);
  };

  const handleResendCode = () => {
    const code = generateVerificationCode();
    sendVerificationEmail(formData.email, code);
    setMessage("New verification code sent to your email");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (activeForm) {
      case "signup":
        handleSignup();
        break;
      case "login":
        handleLogin();
        break;
      case "forgot":
        handleForgotPassword();
        break;
      case "verify":
        handleVerification();
        break;
      case "setPassword":
        handleSetPassword();
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen py-4 md:py-24 flex items-center relative justify-center z-50">
      <div className="h-full w-screen absolute inset-0 z-0 flex">
        <div className="bg-[#E9E4FF] hidden md:flex h-full w-1/2 relative overflow-hidden">
          <div className="w-[13rem] h-[22rem] bg-[#1F3C5F] rounded-full absolute -top-50 -left-20 -rotate-30 "></div>
          <div className="w-[20rem] h-[20rem] border-44 border-[#A9E26A] rounded-full absolute -bottom-35 -left-40"></div>
        </div>
        <div className="bg-linear-to-tr from-[#1F3C5F] via-[#EAEAEA] to-[#A9E26A] h-full w-full md:w-1/2">
          {" "}
        </div>
      </div>
      <div className="flex flex-col md:flex-row  shadow-lg w-full md:w-[calc(100vw-17rem)]">
        {/* Left Side - Forms */}
        <div className="w-full md:w-1/2 p-8 flex items-center md:shadow-lg justify-center  bg-transparent md:bg-white z-50 rounded-l-4xl">
          <div className="w-full max-w-md ">
            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-100  rounded-md text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                {message}
              </div>
            )}

            {/* Signup Form */}
            {activeForm === "signup" && (
              <div className="space-y-3 ">
                <div className="text-start">
                  <h1 className="md:text-3xl text-[35px] font-bold text-gray-800">
                    Sign up
                  </h1>
                  <p className="text-gray-600 mt-4 text-[10px] md:text-sm font-bold md:font-normal">
                    Let's get you all set up so you can access your personal
                    account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-2 py-2 md:py-1 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-2 py-2 bg-white md:py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2 py-2 md:py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john.doe@gmail.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-2 py-2 md:py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your number"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-2 bg-white py-2 md:py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-2 py-2 md:py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="ml-2 text-sm font-semibold text-gray-700"
                    >
                      I agree to all the{" "}
                      <span className="text-blue-600">Terms</span> and{" "}
                      <span className="text-blue-600">Privacy Policies</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1F3C5F] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </form>

                <p className="text-center text-sm font-semibold text-gray-600 mt-4">
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveForm("login")}
                    className="text-blue-600 cursor-pointer font-medium hover:text-blue-500"
                  >
                    Login
                  </button>
                </p>

                <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500 whitespace-nowrap text-sm">
                    Or Sign up with
                  </span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                <div className=" hidden md:flex gap-4 justify-center items-center">
                  <button className="cursor-pointer"><img src={google_icon} alt="Google" className="w-[40px] h-[40px] object-cover"/></button>
                  <button className="cursor-pointer"><img src={facebook_icon} alt="Facebook" className="w-[34px] h-[34px] object-cover" /></button>
                  <button className="cursor-pointer"><img src={apple_icon} alt="Apple" className="w-[40px] h-[40px] object-cover"/></button>
                </div>
                <div className="flex flex-col md:hidden gap-3">
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={google_icon} alt="Google" className="w-[40px] h-[40px] object-cover"/><span className="font-semibold">Continue with Google</span></button>
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={facebook_icon} alt="Facebook" className="w-[34px] h-[34px] object-cover" /><span className="font-semibold">Continue with Facebook</span></button>
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={apple_icon} alt="Apple" className="w-[40px] h-[40px] object-cover"/><span className="font-semibold">Continue with Apple</span></button>
                </div>
              </div>
            )}

            {/* Login Form */}
            {activeForm === "login" && (
              <div className="space-y-6">
                <div className="text-start">
                  <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                  <p className="text-gray-600 mt-1">
                    Login to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john.doe@gmail.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 text-[12px] md:text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveForm("forgot")}
                      className="text-[12px] cursor-pointer md:text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1F3C5F] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className="text-center font-semibold text-sm text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveForm("signup")}
                    className="text-blue-600 cursor-pointer font-medium hover:text-blue-500"
                  >
                    Sign up
                  </button>
                </p>
                <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500 whitespace-nowrap text-sm">
                    Or
                  </span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                <div className=" hidden md:flex gap-4 justify-center items-center">
                  <button className="cursor-pointer"><img src={google_icon} alt="Google" className="w-[40px] h-[40px] object-cover"/></button>
                  <button className="cursor-pointer"><img src={facebook_icon} alt="Facebook" className="w-[34px] h-[34px] object-cover" /></button>
                  <button className="cursor-pointer"><img src={apple_icon} alt="Apple" className="w-[40px] h-[40px] object-cover"/></button>
                </div>
                <div className="flex flex-col md:hidden gap-3">
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={google_icon} alt="Google" className="w-[40px] h-[40px] object-cover"/><span className="font-semibold">Continue with Google</span></button>
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={facebook_icon} alt="Facebook" className="w-[34px] h-[34px] object-cover" /><span className="font-semibold">Continue with Facebook</span></button>
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={apple_icon} alt="Apple" className="w-[40px] h-[40px] object-cover"/><span className="font-semibold">Continue with Apple</span></button>
                </div>
              </div>
            )}

            {/* Forgot Password Form */}
            {activeForm === "forgot" && (
              <div className="space-y-6">
                <button className="flex items-center gap-3 cursor-pointer md:mb-18" onClick={() => setActiveForm("login")}><IoChevronBackSharp/>Back</button>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Forgot your password?
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Don't worry, happens to all of us. Enter your email below to
                    recover your password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john.doe@gmail.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1F3C5F] text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </form>
                 <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500 whitespace-nowrap text-sm">
                    Or Login with
                  </span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                <div className=" hidden md:flex gap-4 justify-center items-center">
                  <button className="cursor-pointer"><img src={google_icon} alt="Google" className="w-[40px] h-[40px] object-cover"/></button>
                  <button className="cursor-pointer"><img src={facebook_icon} alt="Facebook" className="w-[34px] h-[34px] object-cover" /></button>
                  <button className="cursor-pointer"><img src={apple_icon} alt="Apple" className="w-[40px] h-[40px] object-cover"/></button>
                </div>
                <div className="flex flex-col md:hidden gap-3">
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={google_icon} alt="Google" className="w-[40px] h-[40px] object-cover"/><span className="font-semibold">Continue with Google</span></button>
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={facebook_icon} alt="Facebook" className="w-[34px] h-[34px] object-cover" /><span className="font-semibold">Continue with Facebook</span></button>
                  <button className="cursor-pointer flex items-center justify-center rounded-lg gap-2 py-2 px-2 bg-[#FFFFFF14]"><img src={apple_icon} alt="Apple" className="w-[40px] h-[40px] object-cover"/><span className="font-semibold">Continue with Apple</span></button>
                </div>
              </div>
            )}

            {/* Verification Form */}
            {activeForm === "verify" && !verificationSuccess && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Verify code
                  </h1>
                  <p className="text-gray-600 mt-1">
                    An authentication code has been sent to your email.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Code
                    </label>
                    <input
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter code"
                      required
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        Didn't receive a code?
                      </span>{" "}
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Resend
                      </button>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </form>
              </div>
            )}

            {/* Verification Success */}
            {verificationSuccess && (
              <div className="space-y-6 text-center">
                <h1 className="text-2xl font-bold text-green-600">
                  Verification Successful!
                </h1>
                <p className="text-gray-700">
                  Your account has been successfully verified.
                </p>
                <button
                  onClick={handleContinueToSetPassword}
                  className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Set Password Form */}
            {activeForm === "setPassword" && showSetPassword && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Set a password
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Your previous password has been reset. Please create a new
                    password to continue accessing your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Re-enter Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Setting password..." : "Set password"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Image and Text */}
        <div className="hidden md:flex relative md:w-1/2 bg-[#FFFFFF36] z-50   items-center justify-center p-12 text-white rounded-lg">
          <div className="max-w-md text-center ">
            {activeForm === "signup" && (
              <div className="absolute top-5 left-0">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">
                  Join Us
                </h2>
                <p className="text-sm font-semibold text-gray-700">
                  Create An Account And Let Us Take Care Of Your Laundry Needs.
                </p>
                <div className=" mt-8 rounded-lg flex items-center justify-center">
                  <img
                    src="/public/loginRightImg.png"
                    alt="Laundry Service"
                    className="max-h-[50%] max-w-[80%] object-contain brightness-75"
                  />
                </div>
              </div>
            )}

            {activeForm === "login" && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Welcome Back!
                </h2>
                
                <div className=" mt-8 rounded-lg flex items-center justify-center">
                  <img
                    src="/public/loginRightImg.png"
                    alt="Welcome"
                    className="max-h-[50%] max-w-[100%] object-contain brightness-75"
                  />
                </div>
              </>
            )}

            {(activeForm === "forgot" || activeForm === "verify") && (
              <>
                
                <div className="mt-8 rounded-lg flex items-center justify-center">
                 <img
                    src="/public/loginRightImg.png"
                    alt="Welcome"
                    className="max-h-[50%] max-w-[100%] object-contain brightness-75"
                  />
                </div>
              </>
            )}

            {activeForm === "setPassword" && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Almost There!
                </h2>
                <p className="text-xl text-gray-700">
                  Set your new password and regain access to your account. We've
                  got you covered.
                </p>
                <div className="mt-8 h-64 rounded-lg flex items-center justify-center">
                  <img
                    src="/public/loginRightImg.png"
                    alt="Set Password"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;