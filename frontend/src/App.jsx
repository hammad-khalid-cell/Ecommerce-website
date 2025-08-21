import { BrowserRouter as Router , Route, Routes } from "react-router-dom"
import LayoutMain from "./layout/layoutMain"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/" element={<HomePage/>}/>

        </Route>
      </Routes>
    </Router>
   
  )
}

export default App
