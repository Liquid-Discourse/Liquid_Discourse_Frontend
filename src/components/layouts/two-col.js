import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* left-right padding is same as navbar */
  padding: 20px 5%;
  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const Left = styled.div`
  width: ${(props) => props.size + "%"};
  margin-right: 30px;
  @media (max-width: 800px) {
    width: 100%;
    margin-right: 5%;
  }
`;

const Right = styled.div`
  width: ${(props) => props.size + "%"};
  max-width: 250px;
  margin-left: 10px;
  @media (max-width: 800px) {
    margin-top: 50px;
    width: 100%;
    margin-right: 10%;
  }
`;

const TwoCol = ({ left, right, leftSize, rightSize }) => {
  return (
    <Wrapper>
      <Left size={leftSize || 60}>{left}</Left>
      <Right size={rightSize || 40}>{right}</Right>
    </Wrapper>
  );
};

export default TwoCol;
