import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import CurrentAffair from "./pages/current-affair";
import Book from "./pages/book";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/current-affair/:id" exact component={CurrentAffair} />
        <Route path="/book/:id" exact component={Book} />
      </Router>
    </div>
  );
}

export default App;
