import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user); // <-- get user from redux

  if (!user) {
    // user not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // user logged in but not admin
   navigate("/unauthorized");
  }

  return children;
};

export default AdminRoute;
