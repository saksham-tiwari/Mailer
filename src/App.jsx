import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Otp from "./components/auth/Otp";
import VerifyMail from "./components/auth/VerifyMail";
import CreatePassword from "./components/auth/CreatePassword";
import Forgot from "./components/auth/Forgot"
import Home from "./components/layout/homepage/Home";
import Dashboard from "./components/layout/dashboard/Dashboard";
import Navbar from "./components/layout/navbar/Navbar";
import CreateGroup from "./components/layout/CreateGroup/CreateGroup";
import ViewGroup from "./components/layout/ViewGroup/ViewGroup";
import ViewAllGroups from "./components/layout/ViewAllGroups/ViewAllGroups";
import ViewRecord from "./components/layout/ViewRecord/ViewRecord";
import Templates from "./components/layout/templates/Templates";
import { useSelector } from "react-redux";
import NavbarLogout from "./components/layout/navbar/NavbarLogout";
import CreateGroupMethods from "./components/layout/CreateGroupMethods/CreateGroupMethods";
import NotFound from "./components/layout/NotFound/NotFound";
import WithEmails from "./components/layout/CreateGroupMethods/WithEmails/WithEmails";
import WithNames from "./components/layout/CreateGroupMethods/WithNames/WithNames";
import SendSimpleMail from "./components/layout/SendMail/SendSimpleMail";

// import {Switch} from "react-router"

function App() {
  const auth = useSelector((state)=>state.auth)
  return (
    <Router>
      {auth.isLoggedIn?<Navbar/>:<NavbarLogout/>}
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/otp" element={<Otp/>}/>
      <Route exact path="/verify-mail" element={<VerifyMail/>}/>
      <Route exact path="/create-password" element={<CreatePassword/>}/>
      <Route exact path="/forgot-pass" element={<Forgot/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>
      {/* <Route exact path="/create-group" element={<CreateGroup/>}/> */}
      <Route exact path="/view-group/:name/:id" element={<ViewGroup/>}/>
      <Route exact path="/view-all-groups" element={<ViewAllGroups/>}/>
      <Route exact path="/view-record" element={<ViewRecord/>}/>
      <Route exact path="/templates" element={<Templates/>}/>
      <Route exact path="/create-group" element={<CreateGroupMethods/>}/>
      <Route exact path="/create-group/withemails" element={<WithEmails/>}/>
      <Route exact path="/create-group/withnames" element={<WithNames/>}/>
      <Route exact path="/sendMail" element={<SendSimpleMail/>}/>



      <Route path="/404" element={<NotFound/>} />
      <Route path="*" element={<NotFound />} />








      {/* <Route exact path="/home">
        <p>homessss</p>
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
