import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
import TagSelect from "../components/tag-select";

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

const Text = styled.textarea`
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

const AddReview = (props) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTopicTags, setReviewTopicTags] = useState([]);
  const { getTokenSilently } = useAuth0();

  const submit = async () => {
    const token = await getTokenSilently();

    const body = {
      bookId: props.match.params.bookId,
      ratingOutOfTen: reviewRating,
      suggestedTags: reviewTopicTags.map((tag) => tag.value),
    };
    console.log(body);

    await fetch(`${process.env.REACT_APP_API_URL}/book-reviews`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Container>
      <H3>Add your review</H3>
      <span>Currently reviewing book with ID: {props.match.params.bookId}</span>
      <Input
        type="number"
        placeholder="Rating out of ten"
        onChange={(e) => setReviewRating(e.currentTarget.value)}
      />
      <Text
        placeholder="Full text review"
        onChange={(e) => setReviewText(e.currentTarget.value)}
      />
      <div style={{ width: "500px" }}>
        <TagSelect
          type="TOPIC"
          value={reviewTopicTags}
          onChange={setReviewTopicTags}
        />
      </div>
      <Button onClick={submit}>Submit</Button>
    </Container>
  );
};

export default AddReview;
