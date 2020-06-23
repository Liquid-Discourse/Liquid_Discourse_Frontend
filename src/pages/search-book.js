import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  margin: 3%;
`;

const SearchResult = styled.div`
  word-wrap: break-word;
  font-family: Poppins;
  min-width: 45vw;
  cursor: pointer;
  :hover {
    background-color: rgb(240, 240, 240);
  }
`;

const SearchBook = () => {
  const [bookFound, setBookFound] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  let history = useHistory();

  const searchBook = async () => {
    let url = new URL("https://www.googleapis.com/books/v1/volumes?");
    url.searchParams.append("q", searchValue);
    let response = await fetch(url);
    let answer = await response.json();

    console.log("answer", answer.items);

    const books = answer.items;

    // de-duplication algorithm
    const seenBooks = new Set();
    const uniqueBooks = books.filter((book) => {
      console.log(book.volumeInfo.authors);
      const testFragment = JSON.stringify({
        name: book.volumeInfo.title, // a less strict setting (needs exact match)
        //containsQuery: book.volumeInfo.title.includes(searchValue), // a more strict setting (requires only query match)
        // authors: book.volumeInfo.authors.map((author) =>
        //   author.replace(/\s+/g, "").toLowerCase()
        // ),
      });
      const duplicate = seenBooks.has(testFragment);
      seenBooks.add(testFragment);
      return !duplicate;
    });

    setBookFound(uniqueBooks);
  };

  // check if book exists in the database already
  const checkBook = async (googleId) => {
    // check if book exists in the database already
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/books`, {
      params: { googleId: googleId },
    });
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return false;
  };

  const submitBook = async (book) => {
    // check if book exists
    const existingBook = await checkBook(book.id);

    // if it does, redirect to its page
    if (existingBook) {
      return history.push({ pathname: "/add-review/" + existingBook.id });
    }
    // otherwise, post the book to the db
    const payload = {
      googleId: book.id,
      name: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book?.volumeInfo?.description
    };

    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/books`,
      payload
    );

    return history.push({ pathname: "/add-review/" + response.data.id });
  };

  return (
    <Container>
      <H3>Search for a book:</H3>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          placeholder="Search by book, author, or ISBN"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit" onClick={searchBook}>
          Submit
        </Button>
      </div>
      {bookFound != null ? (
        <div>
          {bookFound.map((b, i) => (
            <SearchResult onClick={() => submitBook(b)}>
              <div key={i}>{b.volumeInfo.title}</div>
              {b.volumeInfo.authors !== undefined ? (
                <div style={{ display: "flex", fontSize: "12px" }}>
                  By
                  <div style={{ display: "flex" }}>
                    {b.volumeInfo.authors.map((a, i) => (
                      <div key={i}>&nbsp; {a}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}
              <hr />
            </SearchResult>
          ))}
        </div>
      ) : (
        <div />
      )}
    </Container>
  );
};

export default withRouter(SearchBook);
