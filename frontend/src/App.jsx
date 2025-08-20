import { BrowserRouter as Router , Route, Routes } from "react-router-dom"
import LayoutMain from "./layout/layoutMain"
import Login from "./pages/login"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<HomePage/>}/>

        </Route>
      </Routes>
    </Router>
   
  )
}

export default App
