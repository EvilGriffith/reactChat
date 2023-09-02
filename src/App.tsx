import { BrowserRouter } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AppRoute } from "./components/AppRoute"
import "./app.css"


function App() {
 

  return (
    <BrowserRouter>
      <Navbar/>
      <AppRoute/>
    </BrowserRouter>
  )
}

export default App
