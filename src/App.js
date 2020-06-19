import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import CurrentAffair from "./pages/current-affair";
import Book from "./pages/book";
import SearchBook from "./pages/search-book";
import Settings from "./pages/settings";
import AddReview from "./pages/add-review";
import SubPage from "./pages/sub-pages/current-affair-subpage";

import TagDetail from "./pages/detail-pages/tag-detail";

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
        {/* Main pages */}
        <Route path="/" exact component={Home} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/search-book" exact component={SearchBook} />
        {/* Discovery pages */}
        {/* I recommend we have separate ones for each? e.g. /books, /current-affairs */}
        <Route path="/see-all/:subpage" exact component={SubPage} />
        {/* Detail pages */}
        <Route path="/users/:username" exact component={Profile} />
        <Route path="/book/:id" exact component={Book} />
        <Route path="/current-affair/:id" exact component={CurrentAffair} />
        <Route path="/add-review/:bookId" exact component={AddReview} />

        <Route
          path="/topics/:slug"
          exact
          render={(props) => <TagDetail {...props} type="TOPIC" />}
        />
      </Router>
    </div>
  );
}

export default App;
