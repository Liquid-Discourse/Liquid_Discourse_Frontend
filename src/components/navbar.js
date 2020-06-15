import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
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
  cursor: pointer;
  :hover {
    background-color: #ffffbf;
    border-radius: 5px;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  max-width: 160px;
  width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-left: -10px;
  z-index: 1;
`;

const Dropdown = styled.div`
  :hover ${DropdownContent} {
    display: block;
  }
  display: "flex";
  margin-top: 7px;
`;

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  console.log(user);

  return (
    <Nav>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        {" "}
        <Item primary>Proofed</Item>
      </Link>
      <div style={{ display: "flex" }}>
        <Link
          to="/search-book"
          style={{ textDecoration: "none", color: "black" }}
        >
          {" "}
          <Item>+ Book Review</Item>
        </Link>
        <Item>+ Current Affair</Item>
        {!isAuthenticated && (
          <Item onClick={() => loginWithRedirect({})}>Sign In</Item>
        )}
        {isAuthenticated && (
          <Dropdown>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Poppins",
                fontSize: "1.7vh",
              }}
            >
              {user?.database?.firstName}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            <DropdownContent>
              {/* <Link
                to={"/users/" + user?.database?.username}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Item>Profile</Item>
              </Link> */}
              <a href={"/users/" + user?.database?.username}>
                <Item>Profile</Item>
              </a>
              <a href="/settings">
                <Item>Settings</Item>
              </a>
              <Item onClick={() => logout()}>Logout</Item>
            </DropdownContent>
          </Dropdown>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
