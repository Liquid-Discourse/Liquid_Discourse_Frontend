import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.fit ? "auto-fit" : "auto-fill")},
    minmax(
      ${(props) => (props.min ? props.min : "200px")},
      ${(props) => (props.max ? props.max : "1fr")}
    )
  );
  grid-gap: ${(props) => (props.gap ? props.gap : "50px")};
`;

export default Grid;
