import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";

import Card from "components/current-affair-card-long";
import BookCard from "components/book-card-no-margins";

import TwoCol from "components/layouts/two-col";
import { HorizontalSpacer } from "components/reusable/spacer";

import HomeCover from "components/single-use/home-cover";
import TakeAction from "components/single-use/take-action";
import CoverTitle from "components/reusable/cover-title";
import Organizations from "components/single-use/organizations";
import Feedback from "components/single-use/feedback";

import { Helmet } from "react-helmet";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 50px;
`;

const Home = () => {
  const history = useHistory();
  const [currentAffairs, setCurrentAffairs] = useState([]);
  const [books, setBooks] = useState(null);

  const redirectToPage = (path) => {
    history.push({ pathname: path });
  };

  useEffect(() => {
    const getCurrentAffairs = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tags`,
        {
          params: {
            type: "AFFAIR",
            order: "bookCount",
            orderDirection: "DESC",
          },
        }
      );
      setCurrentAffairs(response.data);
    };

    const getBooks = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/books`,
        {
          params: {
            order: "reviewCount",
            orderDirection: "DESC",
          },
        }
      );
      let books = response.data;
      if (books.length > 6) {
        books.slice(6);
      }
      setBooks(books);
    };

    getCurrentAffairs();
    getBooks();
  }, []);

  console.log(currentAffairs);

  return (
    <>
      <Helmet>
        <title>Proofed - Home</title>
      </Helmet>
      <HomeCover />
      {/* Spacer */}
      <HorizontalSpacer size={40} />
      {/* Below the header */}
      <div
        style={{
          paddingRight: "5%",
          paddingLeft: "5%",
        }}
      >
        <CoverTitle
          name="Current Affairs"
          slug="current-affairs"
          redirectTo={() => redirectToPage(`/current-affairs`)}
        />
        <div
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            width: "82%",
          }}
        >
          {currentAffairs?.map((affair, i) => (
            <>
              <Card
                key={i}
                id={affair.id}
                slug={affair.slug}
                name={affair.name}
                upvotes="something"
                books={affair.books.length}
                recommenders="10 recommenders"
              />
              <HorizontalSpacer size={30} />
            </>
          ))}
        </div>
        <HorizontalSpacer size={60} />
        <CoverTitle
          name="Top Books"
          slug="books"
          redirectTo={() => redirectToPage(`/books`)}
        />
        <Grid>
          {books?.map((b, i) => (
            <BookCard
              key={i}
              id={b.id}
              name={b.name}
              authors={b.authors}
              topics={b.tags[0]?.name}
              recommenders={b.reviewCount}
              rating={b.averageRatingOutOfFive}
            />
          ))}
        </Grid>
      </div>
      <TakeAction />
      <HorizontalSpacer size={40} />
      <Organizations />
      <HorizontalSpacer size={60} />
      <Feedback />
    </>
  );
};

export default withRouter(Home);
