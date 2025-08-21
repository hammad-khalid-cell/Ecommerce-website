import React, { useState } from "react";
import { Link } from "react-router-dom"; 
// Note: Local image imports are replaced with placeholder URLs to make the code runnable.
// import sideImage from "../assets/images/login/sideImage.png";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("this is the frontend data", formData);

      // This is a placeholder for your API call.
      // const res = await fetch("/api/users/forgot-password", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const data = await res.json();
      // console.log("this is the data coming from the backend", data);

      // if (!res.ok) {
      //   if (data.errors) {
      //     const newErrors = {};
      //     data.errors.forEach((err) => {
      //       newErrors[err.path] = err.msg;
      //     });
      //     setErrors(newErrors);
      //   } else if (data.error) {
      //     setErrors({ general: data.error });
      //   }
      //   return;
      // }
      // console.log("Password reset email sent:", data);
      
      // Placeholder for successful action
      setErrors({});
      console.log("Password reset request submitted for email:", formData.email);

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <main className="container mx-auto mt-10 mb-20 px-4 md:px-10">
      <div className="flex  items-center justify-center gap-8 md:gap-16">
       
        {/* Forgot Password Form Section */}
        <div className="w-full md:w-2/5 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your email to receive a password reset link.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm mt-1">{errors.general}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Send Reset Link
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mt-8">
              Remember your password?{" "}
              <Link
                to="/login"
                className="hover:text-red-500 font-semibold hover:underline ease-in-out"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
