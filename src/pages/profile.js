import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
  border-bottom: 2px solid rbg(240, 240, 240);
  box-shadow: 0px 2px 8px -4px rgb(200, 200, 200);
`;
const Tab = styled.div`
  float: left;
  border: none;
  cursor: pointer;
  padding: 10px 12px;
  transition: 0.1s;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props) =>
    props.active ? "rgb(240, 240, 240)" : "white"};
  :hover {
    background-color: #ffffbf;
  }
`;
const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 6px 12px;
`;

const BookReviews = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px rgb(230, 230, 230);
  border-radius: 10px;
  min-width: 250px;
  height: 150px;
  margin: 3%;
  position: relative;
  &:hover {
    background-color: #ff9e80;
  }
`;

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [active, setActive] = useState(0);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile/${props.match.params.username}`
      );
      setProfile(profile);
      console.log("profile data", profile.data);
    };
    getProfile();
  }, []);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

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
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Reviews
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1}>
          Topics
        </Tab>
        <Tab onClick={handleClick} active={active === 2} id={2}>
          Bookshelf
        </Tab>
      </TabList>
      <TabContent active={active === 0}>
        {profile?.data?.bookReviews.map((b, i) => (
          <BookReviews key={i}>
            <div>{b.book.name}</div>
            <div>{b.ratingOutOfTen}/10</div>
          </BookReviews>
        ))}
      </TabContent>
      <TabContent active={active === 1}>
        {profile?.data?.preferredTopics.map((b, i) => (
          <BookReviews key={i}>{b}</BookReviews>
        ))}
      </TabContent>
    </div>
  );
};

export default Profile;
