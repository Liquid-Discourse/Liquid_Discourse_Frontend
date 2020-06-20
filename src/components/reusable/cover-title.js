import React from "react";
import styled from "styled-components";
import { ReactComponent as ViewAllIcon } from "assets/icons/view-all.svg";

const Title = styled.div`
  font-size: 15px;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const SubTitle = styled.div`
  /* margin-top: 5%; */
  font-size: 12px;
  font-family: Poppins;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;

const Cover = styled.div`
  width: 100%;
  padding-top: 6%;
  padding-bottom: 9%;
  background-color: #efebe9;
  box-shadow: inset 0 0 20px rgb(240, 240, 240);
`;

const CoverTitle = ({ name, slug, redirectTo }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: "3%",
      }}
    >
      <Title>
        <div>{name}</div>
      </Title>
      <SubTitle onClick={() => redirectTo(slug)}>
        <div style={{ marginRight: "10px" }}>See all</div>
        <ViewAllIcon />
      </SubTitle>
    </div>
  );
};

export default CoverTitle;
