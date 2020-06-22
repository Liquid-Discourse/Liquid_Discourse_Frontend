import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "react-auth0-spa";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Item = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: ${(props) => (props.primary ? "Montaga" : "Poppins")};
  font-size: ${(props) => (props.primary ? "3vh" : "1.7vh")};
  cursor: pointer;
  :hover {
    color: #ef6c00;
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
`;

const Header = styled.div`
  display: grid;
  grid-template-areas: "logo nav";
  margin-left: 5%;
  margin-right: 5%;
  align-items: center;
  @media (max-width: 700px) {
    grid-template-areas: "logo collapse" "nav nav";
    justify-content: space-between;
  }
`;

const Nav = styled.div`
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(5, auto);
  column-gap: 20px;
  align-items: center;
  justify-items: center;
  @media (max-width: 700px) {
    grid-template-rows: repeat (5, auto);
    grid-template-columns: none;
    grid-row-gap: 10px;
    margin-bottom: 20px;
  }
`;

const Collapse = styled.svg`
  display: none;
  grid-area: collapse;
  transition: 0.1s;
  margin: 0 20px 0 0;
  padding: 0;
  @media (max-width: 700px) {
    display: inline;
  }
`;

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [visible, setVisible] = useState(true);
  const [isSmall, setSmall] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setSmall(true);
      setVisible(!visible);
    } else {
      setSmall(false);
    }
  };

  const toggleNav = () => {
    setVisible(!visible);
  };

  return (
    <Header>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        {" "}
        <Item primary>Proofed</Item>
      </Link>
      <CSSTransition
        in={!isSmall || visible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <Nav>
          <Link to="/books" style={{ textDecoration: "none", color: "black" }}>
            <Item>Books</Item>
          </Link>
          <Link to="/topics" style={{ textDecoration: "none", color: "black" }}>
            <Item>Topics</Item>
          </Link>
          <Link
            to="/current-affairs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Item>Current Affairs</Item>
          </Link>
          <Link
            to="/search-book"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Item>+ Book Review</Item>
          </Link>
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
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={"/users/" + user?.database?.username}
                >
                  <Item>Profile</Item>
                </a>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="/settings"
                >
                  <Item>Settings</Item>
                </a>
                <Item onClick={() => logout()}>Logout</Item>
              </DropdownContent>
            </Dropdown>
          )}
        </Nav>
      </CSSTransition>
      <Collapse
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        onClick={() => toggleNav()}
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
      </Collapse>
    </Header>
  );
};

export default Navbar;
