import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import BookCard from "../../components/book-card";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "react-auth0-spa";
import Grid from "components/reusable/grid";
import { HorizontalSpacer } from "components/reusable/spacer";

const Name = styled.div`
  font-size: 3.3vh;
  font-family: Montaga;
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
  font-size: 13px;
  font-family: Poppins;
`;

const TabList = styled.div`
  font-family: Poppins;
  font-size: 15px;
  overflow: hidden;
  border-bottom: 2px solid rbg(230, 230, 230);
`;

const Tab = styled.div`
  float: left;
  border: none;
  cursor: pointer;
  padding: 10px 12px;
  transition: 0.1s;
  border-radius: 10px 10px 0px 0px;
  margin-right: 5px;
  background-color: ${(props) =>
    props.active ? "white" : "rgb(230, 230, 230)"};
  box-shadow: ${(props) =>
    props.active
      ? "5px 5px 14px #d0cecb, -5px -5px 14px #ffffff"
      : "inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd"};
  :hover {
    background-color: #bdbdbd;
  }
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 6px 12px;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
`;

const BookReview = styled.div`
  font-family: Poppins;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
  background-color: #efebe9;
  border-radius: 10px;
  padding: 25px;
`;
const NothingYet = styled.div`
  text-align: center;
  margin: 3%;
  font-family: Poppins;
  font-size: 13px;
`;

const Profile = (props) => {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [active, setActive] = useState(2);
  const { user, getTokenSilently } = useAuth0();

  const [showReviewDelete, setShowReviewDelete] = useState(false);

  const getProfile = async () => {
    const profile = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/profile/${props.match.params.username}`
    );
    setProfile(profile);
    if (user && user?.database?.auth0Id === profile?.data?.auth0Id) {
      setShowReviewDelete(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, [props.match.params.username]);

  const deleteReview = async (reviewId) => {
    const token = await getTokenSilently();
    await axios.delete(`${process.env.REACT_APP_API_URL}/book-reviews`, {
      data: {
        reviewId: reviewId,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    await getProfile();
  };

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const completeReviews = profile?.data?.bookReviews.length
    ? profile.data.bookReviews.filter(
        (review) => review.isCompleted && !review.isAdminReview
      )
    : [];

  const incompleteReviews = profile?.data?.bookReviews.length
    ? profile.data.bookReviews.filter(
        (review) => review.isCompleted && !review.isAdminReview
      )
    : [];

  return (
    <div style={{ marginRight: "10%", marginLeft: "10%", marginTop: "5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5%",
        }}
      >
        <div>
          <Name>
            {profile?.data?.firstName} {profile?.data?.restOfName}
          </Name>
          <Subtitle>Book Reviews: {profile?.data?.bookReviews.length}</Subtitle>
          <Subtitle>
            Saved Topics: {profile?.data?.preferredTopics.length}
          </Subtitle>
        </div>
        <img
          style={{ borderRadius: "10px" }}
          src={profile?.data?.picture}
          alt="Profile"
          width="100"
        />
      </div>
      <TabList>
        <Tab onClick={handleClick} active={active === 2} id={2}>
          Bookshelf
        </Tab>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Reviews
        </Tab>
        {/* <Tab onClick={handleClick} active={active === 1} id={1}>
          Topics
        </Tab> */}
      </TabList>

      <TabContent active={active === 2}>
        {/* Render bookshelf */}
        {incompleteReviews.length === 0 ? (
          <NothingYet>Nothing on your bookshelf yet!</NothingYet>
        ) : null}
        <Grid min={"180px"} style={{ margin: "5%" }}>
          {incompleteReviews.map((b, i) => (
            <BookCard
              id={b.book.id}
              name={b.book.name}
              authors={b.book.authors}
              topics=""
              recommenders={b.book.reviewCount}
              rating={b.book.averageRatingOutOfFive}
            />
          ))}
        </Grid>
      </TabContent>
      <TabContent active={active === 0}>
        {/* Book reviews */}
        {completeReviews.length === 0 ? (
          <NothingYet>No reviews yet!</NothingYet>
        ) : null}
        {completeReviews.map((b, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5%",
            }}
            key={i}
          >
            <div style={{ width: "25%" }}>
              <BookCard
                id={b.book.id}
                name={b.book.name}
                authors={b.book.authors}
                topics=""
                height={"250px"}
                recommenders={b.book.reviewCount}
                rating={b.book.averageRatingOutOfFive}
              />
            </div>
            <div style={{ width: "75%", marginLeft: "50px" }}>
              <BookReview style={{ height: "250px" }}>
                <div>Your Review: {b.ratingOutOfFive}/5</div>
                <div>Description</div>
                <div>{b.description}</div>
                {showReviewDelete ? (
                  <div onClick={() => deleteReview(b.id)}>Delete</div>
                ) : null}
              </BookReview>
            </div>
          </div>
        ))}
      </TabContent>
      {/* Render topics */}
      {/* <TabContent active={active === 1}>
        {profile?.data?.preferredTopics.map((b, i) => (
          <BookReview key={i}>{b}</BookReview>
        ))}
      </TabContent> */}
    </div>
  );
};

export default withRouter(Profile);
