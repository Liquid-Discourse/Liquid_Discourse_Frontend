import React from "react";
import styled from "styled-components";

import scribble from "assets/scribbles-scribbles-73.png";
import scribble2 from "assets/scribbles-scribbles-7.png";

const Cover = styled.div`
  width: 100%;
  padding-top: 6%;
  padding-bottom: 9%;
  background-color: #efebe9;
  box-shadow: inset 0 0 20px rgb(240, 240, 240);
`;

const Title = styled.div`
  font-size: 3.5vh;
  font-family: Montaga;
  text-align: center;
`;

const HomeCover = () => {
  return (
    <Cover>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            alt="squiggle"
            src={scribble}
          />
        </div>
        <Title>Find and review books on the issues that matter.</Title>
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
            alt="line"
            src={scribble2}
          />
        </div>
      </div>
    </Cover>
  );
};

export default HomeCover;
