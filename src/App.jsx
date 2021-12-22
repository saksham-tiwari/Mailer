import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
// import {Switch} from "react-router"

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/login" element={<Login/>}/>
      {/* <Route exact path="/home">
        <p>homessss</p>
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
