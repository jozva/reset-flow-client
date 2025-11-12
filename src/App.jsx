import { BrowserRouter, Route , Routes} from "react-router"


import Login from "./Login"
import Register from "./Register"
import Forget from "./Forget"
import Reset from "./Reset"



function App() {

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="" element = {<Login/>}/>
          <Route path="login" element = {<Login/>}/>
          <Route path="register" element = {<Register/>}/>
          <Route path="forget" element = {<Forget/>}/>
          <Route path="reset" element = {<Reset/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
