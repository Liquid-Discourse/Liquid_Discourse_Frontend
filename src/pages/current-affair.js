import React, { useEffect, useState } from "react";
import Card from "../components/current-affair-card";
import BookCard from "../components/book-card";
import axios from "axios";
import styled from "styled-components";

const CurrentAffair = (props) => {
  const [affair, setAffair] = useState(null);
  useEffect(() => {
    const getCurrentAffair = async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tags/${props.match.params.id}`
      );
      console.log(response);
      setAffair(response.data);
    };
    getCurrentAffair();
  }, []);

  return (
    <div style={{ margin: "5%" }}>
      <div>Current affair: {affair?.name}</div>
      {affair?.books.map((b, i) => (
        <BookCard
          key={i}
          id={b.div}
          name={b.name}
          authors={b.authors}
          topics=""
          recommenders={b.reviewCount}
          rating={b.averageRatingOutOfTen}
        />
      ))}
    </div>
  );
};

export default CurrentAffair;
