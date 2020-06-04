import React from "react";
import Card from "../components/card";
import styled from "styled-components";

const Title = styled.div`
  margin-top: 5%;
  font-size: 3vh;
  font-family: Montaga;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 3%;
`;

const Home = () => {
  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <Title>
        <div style={{ marginRight: "20px" }}>Current Affairs</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="18"
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
              stroke-width="2"
            />
            <line
              id="Line_2"
              data-name="Line 2"
              y1="18"
              transform="translate(1837.5 155.5)"
              fill="none"
              stroke="#000"
              stroke-width="2"
            />
            <line
              id="Line_3"
              data-name="Line 3"
              x2="17"
              transform="translate(1821.5 155.5)"
              fill="none"
              stroke="#000"
              stroke-width="2"
            />
          </g>
        </svg>
      </Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Card
          name="Black Lives Matter"
          upvotes="200 books"
          books="100 books"
          recommenders="10 recommenders"
        />
        <Card
          name="Coronavirus"
          upvotes="200 books"
          books="100 books"
          recommenders="10 recommenders"
        />
        <Card
          name="Climate Change"
          upvotes="200 books"
          books="100 books"
          recommenders="10 recommenders"
        />
      </div>
    </div>
  );
};

export default Home;
