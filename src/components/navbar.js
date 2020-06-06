import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5%;
  padding-left: 5%;
  box-shadow: 0px 2px 5px rgb(220, 220, 220);
`;

const Item = styled.div`
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: ${(props) => (props.primary ? "Montaga" : "Poppins")};
  font-size: ${(props) => (props.primary ? "3vh" : "1.7vh")};
`;

const Navbar = () => {
  return (
    <Nav>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        {" "}
        <Item primary>Proofed</Item>
      </Link>
      <div style={{ display: "flex" }}>
        <Item>+ Book</Item>
        <Item>+ Current Affair</Item>
        <Item>Sign Up/In</Item>
      </div>
    </Nav>
  );
};

export default Navbar;
