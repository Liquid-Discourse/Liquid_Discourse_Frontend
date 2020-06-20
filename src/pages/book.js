import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth0 } from "react-auth0-spa";

const Name = styled.div`
  font-size: 3.3vh;
  font-family: Montaga;
  margin-bottom: 10px;
`;
const Subtitle = styled.div`
  font-size: 13px;
  font-family: Poppins;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 15px;
  font-family: Poppins;
  display: flex;
  border-bottom: 1px solid grey;
  width: 100%;
  padding: 10px 12px;
  box-shadow: 0px 2px 8px -4px rgb(200, 200, 200);
`;
const Tag = styled.div`
  background-color: rgb(240, 240, 240);
  padding: 2px 3px;
  border-radius: 2px;
  margin: 5px;
`;
const Save = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  :hover {
    background-color: #64d8cb;
    padding: 5px;
    border-radius: 5px;
    opacity: 70%;
  }
`;

const Book = (props) => {
  const { user, getTokenSilently } = useAuth0();
  const [book, setBook] = useState();
  useEffect(() => {
    const getBook = async () => {
      let content = await axios.get(
        `${process.env.REACT_APP_API_URL}/books/${props.match.params.id}`
      );
      setBook(content.data);
    };
    getBook();
  }, [props.match.params.id]);

  const addBook = async () => {
    if (user != null) {
      const token = await getTokenSilently();

      // check if book review exists already
      // in which case, skip
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/book-reviews`,
        {
          params: {
            bookId: book.id,
            userId: user.database.id,
          },
        }
      );
      const bookReview = response.data?.length && response.data[0];
      console.log(bookReview);
      if (bookReview) {
        return;
      }

      // add to bookshelf
      await axios.post(
        `${process.env.REACT_APP_API_URL}/book-reviews`,
        {
          bookId: book.id,
          isCompleted: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  console.log(book);
  return (
    <div style={{ marginRight: "10%", marginLeft: "10%", marginTop: "5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "5%",
        }}
      >
        <div>
          <Name>{book?.name}</Name>
          <Subtitle>
            By:{" "}
            {book?.authors.map((t, i) => (
              <div style={{ marginLeft: "3px" }} key={i}>
                {t}{" "}
              </div>
            ))}
          </Subtitle>
          <br />
          <Subtitle>ISBN: {book?.isbn}</Subtitle>
          <Subtitle>
            Topics:{" "}
            {book?.tags.map((t, i) => (
              <Tag key={i}>{t.name} </Tag>
            ))}
          </Subtitle>
        </div>
        <Save onClick={() => addBook()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
          </svg>
          <Subtitle>Save Book</Subtitle>
        </Save>
      </div>
      <div>
        <Title>Reviews </Title>
        {book?.reviews.map((t, i) => (
          <div key={i}>
            <div>
              {t.userWhoReviewed.firstName} {t.userWhoReviewed.restOfName}
            </div>
            <div>{t.ratingOutOfFive}/5</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
