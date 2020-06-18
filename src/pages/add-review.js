import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
import TagSelect from "../components/tag-select";
import axios from "axios";

const Container = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.textarea`
  min-width: 40vw;
  font-family: poppins;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding-left: 5px;
  padding: 10px;
`;
const Label = styled.div`
  font-family: Poppins;
  font-size: 15px;
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
  const [reviewRating, setReviewRating] = useState("5");

  // Tags
  const [reviewTopicTags, setReviewTopicTags] = useState([]);
  const [reviewAffairTags, setReviewAffairTags] = useState([]);
  const [reviewCountryTags, setReviewCountryTags] = useState([]);

  const [book, setBook] = useState(null);
  const { getTokenSilently, user } = useAuth0();
  const history = useHistory();

  const createSelectTagFromBackendTag = (backendTag) => {
    return {
      value: backendTag.id,
      label: backendTag.name,
    };
  };

  useEffect(() => {
    const getBook = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/books/${props.match.params.bookId}`
      );
      setBook(response.data);
    };

    const getExistingInformation = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/book-reviews`,
        {
          params: {
            userId: user?.database?.id,
            bookId: props.match.params.bookId,
          },
        }
      );
      if (await (response.data && response.data.length)) {
        const review = await response.data[0];
        await console.log("Existing Review", review);

        setReviewRating(review.ratingOutOfTen);

        const affairTags = [];
        const topicTags = [];
        const countryTags = [];

        if (review.suggestedTags.length) {
          review.suggestedTags.forEach((tag) => {
            const createForSelect = createSelectTagFromBackendTag(tag);
            switch (tag.type) {
              case "TOPIC":
                topicTags.push(createForSelect);
                break;
              case "AFFAIR":
                affairTags.push(createForSelect);
                break;
              default:
                countryTags.push(createForSelect);
                break;
            }
          });
        }

        setReviewAffairTags(affairTags);
        setReviewCountryTags(countryTags);
        setReviewTopicTags(topicTags);
      }
    };
    getExistingInformation();
    getBook();
  }, [props.match.params.bookId, user]);

  const submit = async () => {
    const token = await getTokenSilently();

    const combinedTags = [
      ...reviewAffairTags,
      ...reviewCountryTags,
      ...reviewTopicTags,
    ];

    const body = {
      bookId: props.match.params.bookId,
      ratingOutOfTen: reviewRating,
      suggestedTags: combinedTags.map((tag) => tag.value),
      isCompleted: true,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/book-reviews`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await console.log(response);

    history.push({ pathname: "/users/" + user?.database?.username });
  };

  return (
    <Container>
      <H3>Review "{book?.name}"</H3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "3%",
          alignItems: "center",
        }}
      >
        <Label>Review Rating </Label>

        <input
          type="radio"
          checked={reviewRating === 1}
          value={1}
          onClick={(e) => setReviewRating(parseInt(e.target.value))}
        />
        <input
          type="radio"
          checked={reviewRating === 2}
          value={2}
          onClick={(e) => setReviewRating(parseInt(e.target.value))}
        />
        <input
          type="radio"
          checked={reviewRating === 3}
          value={3}
          onClick={(e) => setReviewRating(parseInt(e.target.value))}
        />
        <input
          type="radio"
          checked={reviewRating === 4}
          value={4}
          onClick={(e) => setReviewRating(parseInt(e.target.value))}
        />
        <input
          type="radio"
          checked={reviewRating === 5}
          value={5}
          onClick={(e) => setReviewRating(parseInt(e.target.value))}
        />
        <Label>{reviewRating}</Label>
      </div>
      <Text
        placeholder="Full text review"
        onChange={(e) => setReviewText(e.currentTarget.value)}
      />

      <h2>Add Current Affair tags</h2>
      <div style={{ width: "500px" }}>
        <Label>Current Affair</Label>
        <TagSelect
          type="AFFAIR"
          value={reviewAffairTags}
          onChange={setReviewAffairTags}
        />
      </div>

      <h2>Add Country tags</h2>
      <div style={{ width: "500px" }}>
        <Label>Country</Label>
        <TagSelect
          type="COUNTRY"
          value={reviewCountryTags}
          onChange={setReviewCountryTags}
        />
      </div>

      <h2>Add Topic tags</h2>
      <div style={{ width: "500px" }}>
        <Label>Topic</Label>
        <TagSelect
          type="TOPIC"
          value={reviewTopicTags}
          onChange={setReviewTopicTags}
        />
      </div>

      {/* Submit  */}
      <Button onClick={submit}>Submit</Button>
    </Container>
  );
};

export default withRouter(AddReview);
