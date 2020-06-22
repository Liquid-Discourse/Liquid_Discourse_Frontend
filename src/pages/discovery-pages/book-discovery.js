import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BookCard from "components/book-card";
import styled from "styled-components";
import axios from "axios";
import { HorizontalSpacer } from "components/reusable/spacer";

const AddCard = styled.div`
  box-shadow: 5px 5px 14px #d0cecb, -5px -5px 14px #ffffff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  cursor: pointer;
  padding: 15px 15px;
  &:hover {
    background-color: #ff9e80;
    box-shadow: 5px 5px 14px #d0cecb, -5px -5px 14px #ffffff;
    border-radius: 5px;
    padding: 15px 10px;
  }
`;
const Title = styled.div`
  margin-top: 5%;
  font-size: 2.7vh;
  font-family: Montaga;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 5%;
`;
const Grid = styled.div`
  margin-left: 5%;
  margin-right: 5%;
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
    <div style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Title>Books</Title>
        <AddCard>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <div style={{ fontFamily: "Poppins" }}>Submit a book</div>
        </AddCard>
      </div>
      <HorizontalSpacer size={60} />
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
  );
};

export default BookDiscovery;

{
  /* <div
style={{
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
}}
>
<Title>Books</Title>
<AddCard>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
  <div style={{ fontFamily: "Poppins" }}>Submit a book</div>
</AddCard>
</div> */
}
