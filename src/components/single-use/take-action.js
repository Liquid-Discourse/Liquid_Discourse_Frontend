import React from "react";
import styled from "styled-components";

import scribble from "assets/scribbles-scribbles-73.png";
import { HorizontalSpacer } from "components/reusable/spacer";

const Cover = styled.div`
  /* width: 100%; */
  margin-top: 5%;
  padding-top: 6%;
  padding-bottom: 6%;
  padding-left: 10%;
  padding-right: 10%;
  background: #f5f2ef;
  box-shadow: inset 21px 21px 34px #e6e3e1, inset -21px -21px 34px #fffffd;
`;

const Title = styled.div`
  font-size: 3.5vh;
  font-family: Montaga;
`;

const Subtitle = styled.div`
  font-size: 2vh;
  font-family: Poppins;
  width: 70%;
`;

const Button = styled.a`
  background-color: rgb(230, 230, 230);
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
  font-family: Poppins;
  text-decoration: none;
  cursor: pointer;
  color: black;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
`;

const OrganizationCard = styled.a`
  all: unset;
  box-shadow: 2px 2px 10px rgb(220, 220, 220);
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #ffff8d;
  }
`;

const TakeAction = () => {
  return (
    <Cover>
      <div
        style={{
          display: "flex",
          marginRight: "10%",
        }}
      >
        <div>
          <Title>Take Action</Title>
          <br />
          <Subtitle>
            Reading is good but action is necessary. We know there have been a
            lot of resources making the rounds already, but we'd like to
            highlight organizations that we've supported thus far.{" "}
          </Subtitle>
          <br />
          <Button href="https://proofed-feedbackform.typeform.com/to/ZgVrWxCG">
            Submit an organization
          </Button>
          <HorizontalSpacer size={40} />
          <Grid>
            <OrganizationCard href="https://www.naacpldf.org/">
              <h1>NAACP Legal Defense Fund</h1>
              <p>
                The NAACP Legal Defense and Educational Fund, Inc. (LDF) is
                America's top legal firm fighting for racial justice. LDF seeks
                equality for all Americans.
              </p>
            </OrganizationCard>
            <OrganizationCard href="https://www.naacpldf.org/">
              <h1>NAACP Legal Defense Fund</h1>
              <p>
                The NAACP Legal Defense and Educational Fund, Inc. (LDF) is
                America's top legal firm fighting for racial justice. LDF seeks
                equality for all Americans.
              </p>
            </OrganizationCard>
            <OrganizationCard href="https://www.naacpldf.org/">
              <h1>NAACP Legal Defense Fund</h1>
              <p>
                The NAACP Legal Defense and Educational Fund, Inc. (LDF) is
                America's top legal firm fighting for racial justice. LDF seeks
                equality for all Americans.
              </p>
            </OrganizationCard>
          </Grid>
        </div>
      </div>
    </Cover>
  );
};

export default TakeAction;
