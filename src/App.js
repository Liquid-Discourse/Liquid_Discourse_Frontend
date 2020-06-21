import React from "react";
import { Router, Route } from "react-router-dom";
import Home from "pages/home";
import Profile from "pages/detail-pages/profile";
import Navbar from "components/reusable/navbar";
import Book from "pages/book";
import SearchBook from "pages/search-book";
import Settings from "pages/settings";
import AddReview from "pages/add-review";
import SubPage from "pages/sub-pages/current-affair-subpage";

import AffairDetail from "pages/detail-pages/current-affair-detail";
import TopicDetail from "pages/detail-pages/topic-detail";
import CountryDetail from "pages/detail-pages/country-detail";

import "App.css";

import { useAuth0 } from "react-auth0-spa";
import history from "utils/history";

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
        <Route path="/add-review/:bookId" exact component={AddReview} />
        {/* Discovery pages */}
        {/* I recommend we have separate ones for each? e.g. /books, /current-affairs */}
        <Route path="/see-all/:subpage" exact component={SubPage} />
        {/* Detail pages */}
        <Route path="/users/:username" exact component={Profile} />
        <Route path="/books/:id" exact component={Book} />
        <Route path="/current-affairs/:slug" exact component={AffairDetail} />
        <Route path="/topics/:slug" exact component={TopicDetail} />
        <Route path="/countries/:slug" exact component={CountryDetail} />
      </Router>
    </div>
  );
}

export default App;
