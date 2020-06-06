import React, { useEffect, useState } from "react";
import Card from "../components/current-affair-card";
import styled from "styled-components";

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
