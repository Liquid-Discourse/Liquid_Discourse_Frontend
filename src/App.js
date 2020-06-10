import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import CurrentAffair from "./pages/current-affair";
import Book from "./pages/book";
import Review from "./pages/review";
import Settings from "./pages/settings";

import logo from "./logo.svg";
import "./App.css";

import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router history={history}>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/users/:username" exact component={Profile} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/current-affair/:id" exact component={CurrentAffair} />
        <Route path="/book/:id" exact component={Book} />
        <Route path="/review" exact component={Review} />
      </Router>
    </div>
  );
}

export default App;
