import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import Card from "../components/current-affair-card-long";
import BookCard from "../components/book-card";
import styled from "styled-components";

import TwoCol from "components/layouts/two-col";
import { HorizontalSpacer } from "../components/spacer";

import HomeCover from "components/single-use/home-cover";
import { ReactComponent as ViewAllIcon } from "assets/icons/view-all.svg";

const Title = styled.div`
  font-size: 15px;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const SubTitle = styled.div`
  /* margin-top: 5%; */
  font-size: 12px;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;
const Cover = styled.div`
  width: 100%;
  padding-top: 6%;
  padding-bottom: 9%;
  background-color: #efebe9;
  box-shadow: inset 0 0 20px rgb(240, 240, 240);
`;

const CoverTitle = ({ name, slug, redirectTo }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "3%",
    }}
  >
    <Title>
      <div>{name}</div>
    </Title>
    <SubTitle onClick={() => redirectTo(slug)}>
      <div style={{ marginRight: "10px" }}>See all</div>
      <ViewAllIcon />
    </SubTitle>
  </div>
);

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
      let content = await axios.get(`${process.env.REACT_APP_API_URL}/tags/`, {
        params: {
          type: "AFFAIR",
          orderDirection: "DESC",
        },
      });
      console.log(content);
      setContent(content.data);
    };
    const getBooks = async () => {
      let content = await axios.get(`${process.env.REACT_APP_API_URL}/books/`, {
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
