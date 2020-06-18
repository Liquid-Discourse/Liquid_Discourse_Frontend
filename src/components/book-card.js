import React from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

const Border = styled.div`
  box-shadow: 2px 2px 10px #d7ccc8;
  border-radius: 10px;
  min-width: 200px;
  height: 250px;
  margin: 5%;
  position: relative;
  &:hover {
    background-color: #ff9e80;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20%;
  font-size: 20px;
  font-family: Montaga;
  width: 200px;
  min-width: 200px;
  max-width: 200px;
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
  font-size: 12px;
  left: -50%;
  margin-bottom: 5%;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  padding: 3px;
  width: 170px;
  font-family: Poppins;
  word-wrap: break-word;
`;

const Review = styled.div`
  position: relative;
  left: -50%;
  font-size: 12px;
  margin-bottom: 5%;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  padding: 3px;
  margin-left: 3px;
  width: 80px;
  font-family: Poppins;
  word-wrap: break-word;
`;

const BookCard = ({ id, name, authors, topics, recommenders, rating }) => {
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/book/:id=" + id });
  };

  return (
    <Border onClick={() => redirectCurrentAffair(id)}>
      <Title>{name}</Title>
      <SubTitle>
        {authors?.map((a, i) => (
          <div key={i}>{a}</div>
        ))}
      </SubTitle>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          marginBottom: "5%",
        }}
      >
        <Item>
          <div style={{ marginLeft: "4px" }}>{topics}</div>
        </Item>
        <div style={{ display: "flex" }}>
          <Review>{recommenders} reviews</Review>
          <Review>{rating}/10 stars</Review>
        </div>
      </div>
    </Border>
  );
};

export default withRouter(BookCard);
