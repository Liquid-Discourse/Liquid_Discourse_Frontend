import React from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

const Border = styled.div`
  box-shadow: 2px 2px 10px rgb(220, 220, 220);
  border-radius: 10px;
  min-width: 250px;
  height: 300px;
  position: relative;
  &:hover {
    background-color: #ff9e80;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20%;
  font-size: 3.3vh;
  font-family: Montaga;
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  word-wrap: break-word;
  text-align: center;
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3%;
  font-size: 1.7vh;
  font-family: Poppins;
`;

const Item = styled.div`
  position: relative;
  font-size: 1.7vh;
  left: -50%;
  margin-bottom: 5%;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  padding: 3px;
  width: 200px;
  font-family: Poppins;
  word-wrap: break-word;
`;

const Review = styled.div`
  position: relative;
  left: -50%;
  font-size: 1.7vh;
  margin-bottom: 5%;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  padding: 3px;
  margin-right: 3px;
  width: 96px;
  font-family: Poppins;
  word-wrap: break-word;
`;

const BookCard = ({ id, name, author, topics, recommenders }) => {
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/book/:id=" + id });
  };

  return (
    <Border onClick={() => redirectCurrentAffair(id)}>
      <Title>{name}</Title>
      <SubTitle>By {author}</SubTitle>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          marginBottom: "5%",
        }}
      >
        <Item>
          <div style={{ marginLeft: "4px" }}>
            {topics.map((t, i) => (
              <div style={{ marginRight: "2px" }}>{t}</div>
            ))}
          </div>
        </Item>
        <Item>
          {" "}
          <div style={{ marginLeft: "4px" }}>{recommenders}</div>
        </Item>
        <div style={{ display: "flex" }}>
          <Review>500 reviews</Review>
          <Review>8/10 stars</Review>
        </div>
      </div>
    </Border>
  );
};

export default withRouter(BookCard);
