import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  min-width: 40vw;
  font-family: poppins;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding-left: 5px;
  padding: 10px;
`;

const H3 = styled.h3`
  font-family: Montaga;
  font-weight: normal;
  font-size: 3.3vh;
`;

const Button = styled.button`
  font-family: Poppins;
  font-weight: normal;
  background-color: #bdbdbd;
  border: 1px solid white;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  margin: 3%;
`;

const Review = () => {
  const [bookFound, setBookFound] = useState(false);

  return (
    <Container>
      <H3>Search for a book:</H3>
      <br />
      <Input placeholder="Search by book, author, or ISBN" />
      <Button>Search</Button>
      {bookFound ? <div> book found </div> : <div />}
    </Container>
  );
};

export default Review;
