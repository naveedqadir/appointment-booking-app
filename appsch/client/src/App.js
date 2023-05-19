import "./App.css";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Book from "./Book";
import Viewbook from "./Viewbook";
import Appointment from "./Appointment";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";


function App() {
  const [auth, setAuth] = useState(false);
  const [authemail, setAuthemail] = useState(false);
  // Function to check user authentication status
  async function checkAuthentication() {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.log('User is not authenticated');
        return;
      }
      const response = await fetch('https://backend-kfcd.onrender.com/auth-endpoint', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await response.json();

      if (data.isAuthenticated) {
        console.log('User is authenticated');
        const authemail = localStorage.getItem('authemail');
        setAuthemail(authemail)
        setAuth(true)
      } else {
        console.log('User is not authenticated');
        setAuth(false)
      }
    } catch (error) {
      console.error(error);
    }
  }
  checkAuthentication()

  return (
    <div className="App">
      {/* navbar */}
      <Navbar auth={auth} setAuth={setAuth}/>

      {/* routes */}
      <Router>
        <Routes>
          <Route path="/" element={<Home authemail={authemail} />} />
          {auth === true && <Route path="/appbook/:username" element={<Appointment />} />}
          {auth === false && <Route path="/appbook/:username" element={<Login />} />}
          {auth === false && <Route path="/login" element={<Login />} />}
          {auth === false && <Route path="/Register" element={<Register />} />}
          {auth === true && <Route path="/book" element={<Book />} />}
          {auth === false && <Route path="/book" element={<Login />} />}
          {auth === true && <Route path="/viewbook" element={<Viewbook />} />}
          {auth === false && <Route path="/Viewbook" element={<Login />} />}
          {/* {auth === false && <Route path="*" element={<Login/>} />} */}
        </Routes>
      </Router>


      {/* footer */}
      <br></br>
      <Footer />
    </div>
  );
}

export default App;
