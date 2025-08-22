import React from "react";
import { useState } from "react";
import sideImage from "../assets/images/login/sideImage.png";
import googleIcon from "../assets/images/login/Icon-Google.png";
import facebookIcon from "../assets/images/login/facebook-icon.png"
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
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

  const facebookAuth = ()=>{
    window.open("http://localhost:3000/api/auth/facebook", "_self")
  }

 const googleAuth = () => {
  window.open("http://localhost:3000/api/auth/google", "_self");
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("this is the frontend data", formData);

            // new backend url  =  /api/auth/users    /api/users

      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      const data = await res.json();
      console.log("this is the  data coming from the backend", data);

      if (!res.ok) {
        if (data.errors) {
          const newErrors = {};
          data.errors.forEach((err) => {
            newErrors[err.path] = err.msg;
          });
          setErrors(newErrors);
        } else if (data.error) {
          setErrors({ general: data.error });
          console.log(data.error);
          console.log(errors);
        }
        return;
      }
      console.log("User created:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <main className="container  mt-10  mb-20 pr-10 ">
      <div className="flex flex-col  md:flex-row items-center justify-between gap-16 ">
        {/* Image Section */}
        <div className="w-full h-full md:w-3/5">
          <img
            src={sideImage}
            alt="Sign Up Image"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Sign-up Form Section */}
        <div className="w-1/3 md:w-2/5 bg-white p-8 rounded-lg ">
          <h2 className="text-3xl font-bold   mb-2">
            Create an account
          </h2>
          <p className="text-sm text-gray-500  mb-8">
            Enter your details below
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={formData.name}
              name="username"
              type="text"
              placeholder="Name"
              className="w-full py-3 border-b border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email or Phone Number"
              className="w-full py-3 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full py-3 border-b border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm mt-1">{errors.general}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Create Account
            </button>

            <button
            onClick={googleAuth}
              type="button"
              className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <img src={googleIcon} alt="google-icon" />
              <span>Sign up with Google</span>
            </button>

             <button
             onClick={facebookAuth}
              type="button"
              className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <img src={facebookIcon} alt="facebook-icon" className="w-[32px]" />
              <span>Sign up with Facebook</span>
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mt-8">
              Already have account?{" "}
              <Link
                className="hover:text-red-500 font-semibold hover:underline ease-in-out "
                to="/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
