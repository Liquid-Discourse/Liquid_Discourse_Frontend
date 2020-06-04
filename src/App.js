import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Route path="/" exact component={Home} />
      </Router>
    </div>
  );
}

export default App;
