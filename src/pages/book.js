import React, { useEffect, useState } from "react";
import axios from "axios";

const Book = (props) => {
  const [book, setBook] = useState();
  useEffect(() => {
    const getBook = async () => {
      let content = await axios.get(
        `${process.env.REACT_APP_API_URL}/books/${props.match.params.id}`
      );
      setBook(content.data);
    };
    getBook();
  }, []);

  console.log(book);
  return (
    <div>
      <div>{book?.name}</div>
      <div>ISBN: {book?.isbn}</div>
      <div>
        Topics:{" "}
        {book?.tags.map((t, i) => (
          <div key={i}>{t.name}</div>
        ))}
      </div>
      <div>
        Reviews:{" "}
        {book?.reviews.map((t, i) => (
          <div key={i}>
            <div>
              {t.userWhoReviewed.firstName} {t.userWhoReviewed.restOfName}
            </div>
            <div>{t.ratingOutOfTen}/5</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
