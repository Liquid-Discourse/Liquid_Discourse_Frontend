import styled from "styled-components";

export const HorizontalSpacer = styled.div`
  height: ${(props) => props.size + "px"};
`;

export const VerticalSpacer = styled.div`
  width: ${(props) => props.size + "px"};
`;
