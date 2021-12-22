import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Otp from "./components/auth/Otp";
import VerifyMail from "./components/auth/VerifyMail";
import CreatePassword from "./components/auth/CreatePassword";

// import {Switch} from "react-router"

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/otp" element={<Otp/>}/>
      <Route exact path="/verify-mail" element={<VerifyMail/>}/>
      <Route exact path="/create-password" element={<CreatePassword/>}/>



      {/* <Route exact path="/home">
        <p>homessss</p>
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
