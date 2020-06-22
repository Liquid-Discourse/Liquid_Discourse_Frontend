import React from "react";
import { Router, Route } from "react-router-dom";
import Home from "pages/home";

import Navbar from "components/reusable/navbar";

import SearchBook from "pages/search-book";
import Settings from "pages/settings";
import AddReview from "pages/add-review";

import BookDiscovery from "pages/discovery-pages/book-discovery";
import AffairDiscovery from "pages/discovery-pages/current-affair-discovery";
import TopicDiscovery from "pages/discovery-pages/topic-discovery";

import UserDetail from "pages/detail-pages/user-detail";
import BookDetail from "pages/detail-pages/book-detail";
import AffairDetail from "pages/detail-pages/current-affair-detail";
import TopicDetail from "pages/detail-pages/topic-detail";
import CountryDetail from "pages/detail-pages/country-detail";

import "App.css";

import { useAuth0 } from "react-auth0-spa";
import history from "utils/history";

import ReactGA from "react-ga";
ReactGA.initialize("UA-170220332-1");
ReactGA.pageview(window.location.pathname + window.location.search);

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
        <Route path="/books" exact component={BookDiscovery} />
        <Route path="/current-affairs" exact component={AffairDiscovery} />
        <Route path="/topics" exact component={TopicDiscovery} />
        {/* Detail pages */}
        <Route path="/users/:username" exact component={UserDetail} />
        <Route path="/books/:id" exact component={BookDetail} />
        <Route path="/current-affairs/:slug" exact component={AffairDetail} />
        <Route path="/topics/:slug" exact component={TopicDetail} />
        <Route path="/countries/:slug" exact component={CountryDetail} />
      </Router>
    </div>
  );
}

export default App;
