import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";

import Card from "components/current-affair-card-long";
import BookCard from "components/book-card";

import TwoCol from "components/layouts/two-col";
import { HorizontalSpacer } from "components/reusable/spacer";

import HomeCover from "components/single-use/home-cover";
import CoverTitle from "components/reusable/cover-title";

const Home = () => {
  const history = useHistory();
  const [content, setContent] = useState(null);
  const [books, setBooks] = useState(null);

  const redirectTo = (slug) => {
    history.push({ pathname: "/see-all/" + slug });
  };

  const goToAffair = (id) => {
    history.push({ pathname: "/current-affair/" + id });
  };

  useEffect(() => {
    const getPage = async () => {
      let content = await axios.get(`${process.env.REACT_APP_API_URL}/tags`, {
        params: {
          type: "AFFAIR",
          order: "bookCount",
          orderDirection: "DESC",
        },
      });
      console.log(content);
      setContent(content.data);
    };

    const getBooks = async () => {
      let content = await axios.get(`${process.env.REACT_APP_API_URL}/books`, {
        params: {
          order: "reviewCount",
          orderDirection: "DESC",
        },
      });
      console.log(content.data);
      setBooks(content.data);
    };

    getPage();
    getBooks();
  }, []);

  return (
    <div>
      <HomeCover />
      {/* Spacer */}
      <HorizontalSpacer size={40} />
      {/* Below the header */}
      <TwoCol
        left={
          <>
            <CoverTitle
              name="Current Affairs"
              slug="current-affairs"
              redirectTo={goToAffair}
            />
            {content?.map((c, i) => (
              <Card
                key={i}
                id={c.id}
                name={c.name}
                upvotes="something"
                books={c.books.length}
                recommenders="10 recommenders"
              />
            ))}
          </>
        }
        right={
          <>
            <CoverTitle name="Top Books" slug="books" redirectTo={redirectTo} />
            {books?.map((b, i) => (
              <BookCard
                key={i}
                id={b.div}
                name={b.name}
                authors={b.authors}
                topics={b.tags[0]?.name}
                recommenders={b.reviewCount}
                rating={b.averageRatingOutOfTen}
              />
            ))}
          </>
        }
      ></TwoCol>
    </div>
  );
};

export default withRouter(Home);
