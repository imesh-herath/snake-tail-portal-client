import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LogIn />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
