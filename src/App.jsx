import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Otp from "./components/auth/Otp";
import VerifyMail from "./components/auth/VerifyMail";
import CreatePassword from "./components/auth/CreatePassword";
import Forgot from "./components/auth/Forgot"
import Home from "./components/layout/homepage/Home";
import Dashboard from "./components/layout/dashboard/Dashboard";

// import {Switch} from "react-router"

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/otp" element={<Otp/>}/>
      <Route exact path="/verify-mail" element={<VerifyMail/>}/>
      <Route exact path="/create-password" element={<CreatePassword/>}/>
      <Route exact path="/forgot-pass" element={<Forgot/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>



      {/* <Route exact path="/home">
        <p>homessss</p>
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
