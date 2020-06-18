import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import Card from "../components/current-affair-card-long";
import BookCard from "../components/book-card";
import styled from "styled-components";
import scribble from "./scribbles-scribbles-73.png";
import scribble2 from "./scribbles-scribbles-7.png";

const Title = styled.div`
  font-size: 2.3vh;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 5%;
`;
const Title2 = styled.div`
  font-size: 3.5vh;
  font-family: Montaga;
  text-align: center;
`;

const SubTitle = styled.div`
  margin-top: 5%;
  font-size: 1.7vh;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;
const Cover = styled.div`
  width: 100%;
  padding-top: 5%;
  padding-bottom: 8%;
  background-color: #efebe9;
  box-shadow: inset 0 0 20px rgb(240, 240, 240);
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
      <div>{name}</div>
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
  const [content, setContent] = useState(null);

  const redirectTo = (slug) => {
    history.push({ pathname: "/see-all/" + slug });
  };

  useEffect(() => {
    const getPage = async () => {
      let content = await axios.get(`${process.env.REACT_APP_API_URL}/tags/`, {
        params: {
          type: "AFFAIR",
          orderDirection: "DESC",
        },
      });
      setContent(content.data);
    };
    getPage();
  }, []);

  return (
    <div>
      <Cover>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "5%",
          }}
        >
          <div
            style={{
              width: "130px",
              height: "auto",
              marginRight: "20px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: " scaleX(-1) rotate(-20deg)",
              }}
              src={scribble}
            />
          </div>
          <Title2>Find and review books on the issues that matter.</Title2>
          <div
            style={{
              width: "160px",
              height: "auto",
              marginRight: "10px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={scribble2}
            />
          </div>
        </div>
      </Cover>
      <div
        style={{
          margin: "5%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "60%" }}>
          <CoverTitle
            name="Current Affairs"
            slug="current-affairs"
            redirectTo={redirectTo}
          />
          {content?.map((c, i) => (
            <Card
              onClick={() => redirectTo(c.id)}
              key={i}
              id="black-lives-matter"
              name={c.name}
              upvotes="something"
              books={c.books.length}
              recommenders="10 recommenders"
            />
          ))}
        </div>
        <div
          style={{
            marginRight: "1%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CoverTitle name="Top Books" slug="books" redirectTo={redirectTo} />
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
      </div>
    </div>
  );
};

export default withRouter(Home);
