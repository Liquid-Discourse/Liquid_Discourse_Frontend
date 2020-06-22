import React from "react";
import styled from "styled-components";
import useBook from "hooks/book-hook";
import StarRatings from "react-star-ratings";

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
  width: 100%;
  padding-bottom: 10px;
`;

const Tag = styled.div`
  background-color: rgb(230, 230, 230);
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

const Review = styled.div`
  font-family: Poppins;
  //box-shadow: 2px 2px 8px rgb(230, 230, 230);
  background-color: #efebe9;
  border-radius: 10px;
  padding: 10px 12px;
  margin-left: 2%;
  margin-right: 2%;
  position: relative;
`;

const ReviewContainer = styled.div`
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Book = (props) => {
  const { book, addToBookshelf } = useBook(props.match.params.id);

  return (
    <div style={{ marginRight: "15%", marginLeft: "15%", marginTop: "5%" }}>
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
            {book?.authors?.map((t, i) => (
              <div style={{ marginLeft: "3px" }} key={i}>
                {t}{" "}
              </div>
            ))}
          </Subtitle>
          <br />
          <Subtitle>ISBN: {book?.isbn}</Subtitle>
          <Subtitle>
            Topics:{" "}
            {book?.tags?.map((t, i) => (
              <Tag key={i}>{t.name} </Tag>
            ))}
          </Subtitle>
        </div>
        <Save onClick={addToBookshelf}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
          </svg>
          {book === {} ? (
            <Subtitle>Save Book</Subtitle>
          ) : (
            <Subtitle>Saved!</Subtitle>
          )}
        </Save>
      </div>
      <div>
        <Title>Reviews </Title>
        <ReviewContainer>
          {book?.reviews?.map((t, i) => (
            <Review key={i}>
              <div>
                {t.userWhoReviewed.firstName} {t.userWhoReviewed.restOfName}
              </div>
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>Rating: </div>
                <StarRatings
                  rating={t.ratingOutOfFive}
                  starRatedColor="#ffca28"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="5px"
                />
                <div style={{ marginLeft: "5px" }}>{t.ratingOutOfFive}/5</div>
              </div>
              <div>{t?.description}</div>
            </Review>
          ))}
        </ReviewContainer>
      </div>
    </div>
  );
};

export default Book;
