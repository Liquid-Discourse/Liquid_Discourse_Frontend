import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
  margin-right: 10%;
  margin-left: 10%;
`;
const OrganizationCard = styled.a`
  all: unset;
  box-shadow: 5px 5px 14px #d0cecb, -5px -5px 14px #ffffff;
  padding: 15px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: #fff4c9;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-family: Montaga;
  word-wrap: break-word;
  margin-bottom: 10px;
`;
const SubTitle = styled.div`
  padding-top: 3%;
  font-size: 1.7vh;
  font-family: Poppins;
  line-height: 20px;
`;

const Organizations = () => {
  return (
    <Grid>
      <OrganizationCard href="https://www.naacpldf.org/">
        <Title>NAACP Legal Defense Fund</Title>
        <SubTitle>
          The NAACP Legal Defense and Educational Fund, Inc. (LDF) is America's
          top legal firm fighting for racial justice. LDF seeks equality for all
          Americans.
        </SubTitle>
      </OrganizationCard>
      <OrganizationCard href="https://www.theokraproject.com/">
        <Title>The Okra Project</Title>
        <SubTitle>
          The Okra Project is a collective that brings home cooked, healthy, and
          culturally specific meals and resources to Black Trans People wherever
          we can reach them.
        </SubTitle>
      </OrganizationCard>
      <OrganizationCard href="https://eji.org/">
        <Title>Equal Justice Initiative</Title>
        <SubTitle>
          EJI provides legal representation to people who have been illegally
          convicted, unfairly sentenced, or abused in state jails and prisons.
        </SubTitle>
      </OrganizationCard>
      <OrganizationCard href="https://thelovelandfoundation.org/">
        <Title>The Loveland Foundation</Title>
        <SubTitle>
          Loveland Foundation shows up for communities of color in unique and
          powerful ways, with a particular focus on Black women and girls.
        </SubTitle>
      </OrganizationCard>
    </Grid>
  );
};

export default Organizations;
