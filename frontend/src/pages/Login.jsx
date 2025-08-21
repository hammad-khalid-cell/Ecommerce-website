import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import sideImage from "../assets/images/login/sideImage.png";

// Note: Local image imports are replaced with placeholder URLs to make the code runnable.
// import sideImage from "../assets/images/login/sideImage.png";
// import googleIcon from "../assets/images/login/Icon-Google.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // const res = await fetch("/api/users/login", {
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
      // console.log("User logged in:", data);
      
      // Placeholder for successful login
      setErrors({});
      console.log("User logged in with email:", formData.email);

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <main className="container  mt-10  mb-20 pr-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Image Section */}
        <div className="w-full h-full md:w-3/5">
          <img
            // Placeholder URL for the login image
            src={sideImage}
            alt="Log In Image"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Log-in Form Section */}
        <div className="w-1/3 md:w-2/5 bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold  mb-2">
            Log in to Exclusive
          </h2>
          <p className="text-sm text-gray-500  mb-8">
            Enter your details below
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email or Phone Number"
              className="w-full py-3  border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full py-3 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm mt-1">{errors.general}</p>
            )}

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                className="w-1/2 bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Log In
              </button>
              <a
                href="#"
                className="text-red-500 text-sm font-medium hover:underline transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link
                to="/signup" // Use Link for routing to the signup page
                className="hover:text-red-500 font-semibold hover:underline ease-in-out"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
