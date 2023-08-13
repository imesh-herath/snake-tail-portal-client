import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
// import Home from './component/home';
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import './App.css';
  
class App extends Component {
render() {
    return (
    <Router>
        <div className="App">
        <Routes>
                <Route exact path='/' element={< LogIn />}></Route>
                <Route exact path='/signup' element={< SignUp />}></Route>
        </Routes>
        </div>
    </Router>
);
}
}
  
export default App;