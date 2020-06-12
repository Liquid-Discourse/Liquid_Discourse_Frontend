import React, { useEffect, useState } from "react";

const Book = (props) => {
  const [book, setBook] = useState();
  useEffect(() => {
    const getBook = async () => {
      const id = props.match.params.id;
      setBook(id);
    };
    getBook();
  }, []);

  return (
    <div>
      <div>Current affair {book}</div>
    </div>
  );
};

export default Book;
