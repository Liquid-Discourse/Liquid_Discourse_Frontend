import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "components/current-affair-card-long";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { HorizontalSpacer } from "components/reusable/spacer";

const SubmitCard = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px rgb(230, 230, 230);
  border-radius: 5px;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ff9e80;
  }
`;

const Title = styled.div`
  font-size: 2.7vh;
  font-family: Montaga;
  display: flex;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
`;

const CurrentAffairDiscovery = (props) => {
  const [affairs, setAffairs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getAffairs = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tags/`,
        {
          params: {
            type: "AFFAIR",
          },
        }
      );
      setAffairs(response.data);
    };
    getAffairs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Proofed - Current Affairs</title>
      </Helmet>
      <div style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%" }}>
        <HorizontalSpacer size={30} />
        {/* Header and control */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Current Affairs</Title>
          <SubmitCard>
            <PlusIcon />
            <div style={{ fontFamily: "Poppins", marginLeft: "20px" }}>
              Submit a Current Affair
            </div>
          </SubmitCard>
        </div>
        {/* Spacer */}
        <HorizontalSpacer size={30} />
        {/* Grid */}
        <Grid>
          {affairs?.map((affair, i) => (
            <Card
              key={i}
              id={affair.id}
              slug={affair.slug}
              name={affair.name}
              upvotes="something"
              books={affair.books.length}
              recommenders="10 recommenders"
            />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CurrentAffairDiscovery;
