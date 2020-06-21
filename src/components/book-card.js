import React from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

const Border = styled.div`
  background: #f5f2ef;
  box-shadow: 5px 5px 14px #d0cecb, -5px -5px 14px #ffffff;
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
  position: absolute;
  text-align: center;
  width: 100%;
  justify-content: center;
  padding-top: 20%;
  font-size: 20px;
  font-family: Montaga;
  word-wrap: break-word;
`;
const SubTitle = styled.div`
  text-align: center;
  width: 100%;
  justify-content: center;
  padding-top: 3%;
  font-size: 1.7vh;
  font-family: Poppins;
`;

const Item = styled.div`
  position: relative;
  background: #f5f2ef;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
  font-size: 12px;
  left: -50%;
  margin-bottom: 5%;
  border-radius: 4px;
  padding: 5px;
  width: 170px;
  font-family: Poppins;
  word-wrap: break-word;
  margin-left: 3px;
`;

const Review = styled.div`
  position: relative;
  left: -50%;
  font-size: 12px;
  margin-bottom: 5%;
  background: #f5f2ef;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
  border-radius: 5px;
  padding: 3px;
  margin-left: 3px;
  width: 80px;
  font-family: Poppins;
  word-wrap: break-word;
`;

const BookCard = ({ id, name, authors, topics, recommenders, rating }) => {
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/books/" + id });
  };

  return (
    <Border onClick={() => redirectCurrentAffair(id)}>
      <Title>
        {name}
        <SubTitle>
          {authors?.map((a, i) => (
            <div key={i}>{a}</div>
          ))}
        </SubTitle>
      </Title>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          marginBottom: "5%",
        }}
      >
        <Item>
          <div>{topics}</div>
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
