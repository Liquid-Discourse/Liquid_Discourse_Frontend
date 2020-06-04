import React from "react";
import styled from "styled-components";

const Border = styled.div`
  box-shadow: 2px 2px 10px rgb(220, 220, 220);
  border-radius: 10px;
  min-width: 250px;
  height: 250px;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20%;
  font-size: 3.3vh;
  font-family: Montaga;
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
`;

const Card = ({ name, upvotes, books, recommenders }) => {
  return (
    <Border>
      <Title>{name}</Title>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          marginBottom: "5%",
        }}
      >
        <Item>{upvotes}</Item>
        <Item>{books}</Item>
        <Item>{recommenders}</Item>
      </div>
    </Border>
  );
};

export default Card;
