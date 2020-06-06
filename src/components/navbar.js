import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";

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
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Nav>
      <Item primary>Proofed</Item>
      <div style={{ display: "flex" }}>
        <Item>+ Book</Item>
        <Item>+ Current Affair</Item>
        {!isAuthenticated && (
          <Item onClick={() => loginWithRedirect({})}>Sign In</Item>
        )}
        {isAuthenticated && <Item onClick={() => logout()}>Sign Out</Item>}
      </div>
    </Nav>
  );
};

export default Navbar;
