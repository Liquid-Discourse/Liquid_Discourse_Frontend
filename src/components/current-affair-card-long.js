import React from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

const Border = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px #d7ccc8;
  border-radius: 5px;
  width: 100%;
  height: 70px;
  margin: 1%;
  padding: 2% 2%;
  position: relative;
  font-size: 12px;
  &:hover {
    background-color: #ffe0b2;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-family: Montaga;
  word-wrap: break-word;
  padding-bottom: 5px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
  border-radius: 3px;
  padding: 2px 5px;
  margin-right: 2%;
`;

const Card = ({ id, name, upvotes, books, recommenders }) => {
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/current-affair/" + id });
  };

  return (
    <Border onClick={() => redirectCurrentAffair(id)}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title>{name}</Title>
          <div>description</div>
          <div>Topics: </div>
        </div>
        <Item>
          <div style={{ fontSize: "18px" }}>{books}</div>
          <div>books</div>
        </Item>
      </div>
    </Border>
  );
};

export default withRouter(Card);
