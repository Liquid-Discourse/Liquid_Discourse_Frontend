import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BookCard from "components/book-card";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";
import { HorizontalSpacer } from "components/reusable/spacer";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";

const SubmitCard = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px rgb(230, 230, 230);
  border-radius: 5px;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ff9e80;
    cursor: pointer;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 50px;
`;

const BookDiscovery = (props) => {
  const [books, setBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getBooks = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/books`,
        {}
      );
      setBooks(response.data);
    };
    getBooks();
  }, []);

  const redirectToPath = (path) => {
    history.push({ pathname: path });
  };

  return (
    <>
      <Helmet>
        <title>Proofed - Books</title>
      </Helmet>
      <div style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%" }}>
        <HorizontalSpacer size={30} />
        {/* Header and control */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Books</Title>
          <SubmitCard onClick={() => history.push(`/search-book`)}>
            <PlusIcon />
            <div style={{ fontFamily: "Poppins", marginLeft: "20px" }}>
              Submit a Book Review
            </div>
          </SubmitCard>
        </div>
        {/* Spacer */}
        <HorizontalSpacer size={40} />
        {/* Grid */}
        <Grid>
          {books?.map((book, i) => (
            <BookCard
              key={i}
              id={book.id}
              name={book.name}
              authors={book.authors}
              topics={book.tags[0]?.name}
              recommenders={book.reviewCount}
              rating={book.averageRatingOutOfFive}
            />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default BookDiscovery;
