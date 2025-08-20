import React from "react";
import { useState } from "react";
import sideImage from "../assets/images/login/sideImage.png";
import googleIcon from "../assets/images/login/Icon-Google.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("User created:", data);
      alert("Signup successful!");
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
          <h2 className="text-3xl font-bold text-center mb-2">
            Create an account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your details below
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={formData.name}
              name="name"
              type="text"
              placeholder="Name"
              className="w-full p-3 border-b border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email or Phone Number"
              className="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border-b border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Create Account
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 font-semibold py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <img src={googleIcon} alt="" />
              <span>Sign up with Google</span>
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mt-8">
              Already have account?{" "}
              <a
                href="#"
                className="hover:text-red-500 font-semibold hover:underline ease-in-out "
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
