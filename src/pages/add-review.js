import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "react-auth0-spa";
import TagSelect from "components/reusable/tag-select";
import StarRatings from "react-star-ratings";
import axios from "axios";

const Container = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Review = styled.div`
  border-radius: 5px;
  padding: 30px 30px;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
`;
const Text = styled.textarea`
  min-width: 49vw;
  font-family: poppins;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding-left: 5px;
  padding: 10px;
`;
const Label = styled.div`
  font-family: Poppins;
  font-size: 15px;
  margin-bottom: 5px;
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
  margin-top: 5%;
`;
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  :before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  :before {
    border-radius: 50%;
  }
`;
const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  ${(props) => props.active} + ${Slider} {
    background-color: #64dd17;
  }
  :focus + ${Slider} {
    box-shadow: 0 0 1px #2196f3;
  }
  ${(props) => props.active} + ${Slider}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const AddReview = (props) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [notifyUser, setNotifyUser] = useState(false);
  const [isAdminReview, setIsAdminReview] = useState(false);

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

        setReviewRating(review.ratingOutOfFive);
        setIsAdminReview(review.isAdminReview);

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
    if (reviewRating === 0) {
      setNotifyUser(true);
    } else {
      const token = await getTokenSilently();

      const combinedTags = [
        ...reviewAffairTags,
        ...reviewCountryTags,
        ...reviewTopicTags,
      ];

      const body = {
        bookId: props.match.params.bookId,
        ratingOutOfFive: reviewRating,
        suggestedTags: combinedTags.map((tag) => tag.value),
        isCompleted: true,
        isAdminReview: isAdminReview,
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

      history.push({ pathname: "/users/" + user?.database?.username });
    }
  };

  const changeRating = (newRating, name) => {
    setReviewRating(newRating);
    console.log(reviewRating);
  };

  return (
    <Container>
      <H3>Review "{book?.name}"</H3>
      <Review>
        <Label style={{ marginRight: "5px" }}>Review Rating </Label>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <StarRatings
            rating={reviewRating}
            starRatedColor="#ffca28"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="5px"
          />
          {reviewRating === "0" ? (
            <div />
          ) : (
            <Label style={{ marginLeft: "5px" }}>{reviewRating}/5</Label>
          )}
        </div>
        <Label style={{ width: "500px", marginTop: "25px" }}>
          Full text review
        </Label>
        <Text
          placeholder="Text Here"
          onChange={(e) => setReviewText(e.currentTarget.value)}
        />

        <div style={{ width: "500px", marginTop: "25px" }}>
          <Label>Add Current Affair tags</Label>
          <TagSelect
            type="AFFAIR"
            value={reviewAffairTags}
            onChange={setReviewAffairTags}
          />
        </div>

        <div style={{ width: "500px", marginTop: "25px" }}>
          <Label>Add Country tags</Label>
          <TagSelect
            type="COUNTRY"
            value={reviewCountryTags}
            onChange={setReviewCountryTags}
          />
        </div>

        <div style={{ width: "500px", marginTop: "25px" }}>
          <Label>Add Topic tags</Label>
          <TagSelect
            type="TOPIC"
            value={reviewTopicTags}
            onChange={setReviewTopicTags}
          />
        </div>

        {user?.database?.isAdmin ? (
          <div style={{ width: "500px", marginTop: "25px" }}>
            <Label>
              You are an admin. Would you like this review to be an admin
              review? Admin reviews are only used to contribute tag suggestions
              for a book
            </Label>
            <Switch>
              <SwitchInput
                type="checkbox"
                active={!isAdminReview}
                onClick={() => {
                  setIsAdminReview((isAdminReview) => !isAdminReview);
                }}
              />
              <Slider class="slider round"></Slider>
            </Switch>
          </div>
        ) : null}

        {/* Submit  */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={submit}>Submit</Button>
          {notifyUser ? <div>Please submit a rating first</div> : <div />}
        </div>
      </Review>
    </Container>
  );
};

export default withRouter(AddReview);
