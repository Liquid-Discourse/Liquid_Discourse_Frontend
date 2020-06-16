import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import Card from "../components/current-affair-card";
import BookCard from "../components/book-card";
import styled from "styled-components";

const Title = styled.div`
  margin-top: 5%;
  font-size: 2.7vh;
  font-family: Montaga;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 5%;
`;

const SubTitle = styled.div`
  margin-right: 5%;
  margin-top: 5%;
  font-size: 1.7vh;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;

const CoverTitle = ({ name, slug, redirectTo }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    }}
  >
    <Title>
      <div style={{ marginRight: "20px" }}>{name}</div>
    </Title>
    <SubTitle onClick={() => redirectTo(slug)}>
      <div style={{ marginRight: "10px" }}>See all</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="12"
        viewBox="0 0 17.747 19.664"
      >
        <g
          id="Group_1"
          data-name="Group 1"
          transform="translate(-1820.753 -154.5)"
        >
          <line
            id="Line_1"
            data-name="Line 1"
            y1="18"
            x2="16"
            transform="translate(1821.5 155.5)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <line
            id="Line_2"
            data-name="Line 2"
            y1="18"
            transform="translate(1837.5 155.5)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <line
            id="Line_3"
            data-name="Line 3"
            x2="17"
            transform="translate(1821.5 155.5)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
        </g>
      </svg>
    </SubTitle>
  </div>
);

const Home = () => {
  const history = useHistory();
  const redirectTo = (slug) => {
    history.push({ pathname: "/see-all/" + slug });
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%" }}>
      <CoverTitle
        name="Current Affairs"
        slug="current-affairs"
        redirectTo={redirectTo}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card
          id="black-lives-matter"
          name="Black Lives Matter"
          upvotes="200 books"
          books="10 categories"
          recommenders="10 recommenders"
        />
        <Card
          id="black-lives-matter"
          name="Coronavirus"
          upvotes="200 books"
          books="10 categories"
          recommenders="10 recommenders"
        />
        <Card
          id="black-lives-matter"
          name="Climate Change"
          upvotes="200 books"
          books="10 categories"
          recommenders="10 recommenders"
        />
      </div>
      <CoverTitle name="Proofed Books" slug="books" redirectTo={redirectTo} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <BookCard
          name="Are Prisons Obsolete"
          author="Angela Davis"
          topics={["blacklivesmatter"]}
          recommenders="10 recommenders"
        />
        <BookCard
          name="Between the World and Me"
          author="Ta-Nehisi Coates"
          topics={["blacklivesmatter"]}
          recommenders="10 recommenders"
        />
        <BookCard
          name="Becoming"
          author="Michelle Obama"
          topics={["blacklivesmatter"]}
          recommenders="10 recommenders"
        />
      </div>
      <CoverTitle
        name="Proofed Reviewers"
        slug="reviewers"
        redirectTo={redirectTo}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card
          name="Barack Obama"
          upvotes="#blacklivesmatter"
          books="100 books"
          recommenders="10 recommenders"
        />
        <Card
          name="Roxanne Gay"
          upvotes="#blacklivesmatter"
          books="100 books"
          recommenders="10 recommenders"
        />
        <Card
          name="Kendrick Sampson"
          upvotes="#blacklivesmatter"
          books="100 books"
          recommenders="10 recommenders"
        />
      </div>
    </div>
  );
};

export default withRouter(Home);
