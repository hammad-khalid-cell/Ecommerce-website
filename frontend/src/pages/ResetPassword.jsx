import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to reset password");
      } else {
        alert("Password reset successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <main className="container mx-auto mt-10 mb-20 px-4 md:px-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button type="submit" className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors duration-200">
            Reset Password
          </button>
        </form>
      

      </div>
    </main>
  );
};

export default ResetPassword;
