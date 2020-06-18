import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const ContentStructure = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default ContentStructure;
