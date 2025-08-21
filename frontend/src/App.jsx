import { BrowserRouter as Router , Route, Routes } from "react-router-dom"
import LayoutMain from "./layout/layoutMain"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgetPassword"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/ForgetPassword" element={<ForgotPassword />} />

        </Route>
      </Routes>
    </Router>
   
  )
}

export default App
