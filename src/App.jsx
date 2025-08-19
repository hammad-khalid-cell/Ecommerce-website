import { BrowserRouter as Router , Route, Routes } from "react-router-dom"
import LayoutMain from "./layout/layoutMain"
import Login from "./pages/login"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<LayoutMain/>}>
          <Route path="/login" element={<Login/>}/>

        </Route>
      </Routes>
    </Router>
   
  )
}

export default App
