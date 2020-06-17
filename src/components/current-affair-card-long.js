import React from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

const Border = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px rgb(230, 230, 230);
  border-radius: 5px;
  width: 100%;
  height: 70px;
  margin: 1%;
  padding: 2% 2%;
  position: relative;
  font-size: 12px;
  &:hover {
    background-color: #ffff8d;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-family: Montaga;
  word-wrap: break-word;
  padding-bottom: 5px;
`;

const Item = styled.div`
  position: relative;
  font-size: 1.7vh;
  left: -50%;
  margin-bottom: 5%;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  padding: 3px;
  width: 170px;
  font-family: Poppins;
`;

const Card = ({ id, name, upvotes, books, recommenders }) => {
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/current-affair/:id=" + id });
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "1px solid black",
            padding: "2px 5px",
            marginRight: "2%",
          }}
        >
          <div style={{ fontSize: "18px" }}>{books}</div>
          <div>books</div>
        </div>
      </div>
    </Border>
  );
};

export default withRouter(Card);
