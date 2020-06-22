import React from "react";
import styled from "styled-components";

import scribble from "assets/scribbles-scribbles-73.png";

const Cover = styled.div`
  width: 100%;
  margin-top: 5%;
  padding-top: 6%;
  padding-bottom: 6%;
  padding-left: 10%;
  padding-right: 10%;
  background: #f5f2ef;
  box-shadow: inset 21px 21px 34px #e6e3e1, inset -21px -21px 34px #fffffd;
`;

const Title = styled.div`
  font-size: 3.5vh;
  font-family: Montaga;
`;

const Subtitle = styled.div`
  font-size: 2vh;
  font-family: Poppins;
  width: 70%;
`;

const Button = styled.a`
  background-color: rgb(230, 230, 230);
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
  font-family: Poppins;
  text-decoration: none;
  cursor: pointer;
  color: black;
`;

const TakeAction = () => {
  return (
    <Cover>
      <div
        style={{
          display: "flex",
          marginRight: "10%",
        }}
      >
        <div>
          <Title>Take Action</Title>
          <br />
          <Subtitle>
            Reading is good but action is necessary. We know there have been a
            lot of resources making the rounds already, but we'd like to
            highlight organizations that we've supported thus far.{" "}
          </Subtitle>
          <br />
          <Button href="https://proofed-feedbackform.typeform.com/to/ZgVrWxCG">
            Submit an organization
          </Button>
        </div>
      </div>
    </Cover>
  );
};

export default TakeAction;
