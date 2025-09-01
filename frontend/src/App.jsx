import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutMain from "./layout/layoutMain";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgetPassword";
import AdminPanel from "./pages/AdminPanel";
import UnAuthorized from "./pages/UnAuthorized";
import AdminRoute from "./components/AdminRoute";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
  startLoading,
} from "./redux/slices/user/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(startLoading());
      try {
        const res = await fetch("http://localhost:3000/api/user/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("not authenticated");

        const data = await res.json();
        dispatch(setUser(data));
        console.log("this is the user data", data);
      } catch (err) {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/ForgetPassword" element={<ForgotPassword />} />
          <Route path="/UnAuthorized" element={<UnAuthorized />} />
        </Route>
        <Route
          path="/AdminPanel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
