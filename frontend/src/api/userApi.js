// src/api/userApi.js

export const fetchMe = async () => {
  const res = await fetch("http://localhost:3000/api/user/me", {
    method: "GET",
    credentials: "include", // 🔑 send cookies automatically
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
};
