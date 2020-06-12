import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
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
  border-bottom: 1px solid grey;
`;
const Tab = styled.div`
  float: left;
  border: none;
  cursor: pointer;
  padding: 12px 14px;
  transition: 0.3s;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props) =>
    props.active ? "rgb(240, 240, 240)" : "white"};
  :hover {
    background-color: #ffffbf;
  }
`;
const TabContent = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  padding: 6px 12px;
`;

const BookReviews = styled.div`
  font-family: Poppins;
`;

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState([1, 0, 0]);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile/${props.match.params.username}`
      );
      setProfile(profile);
    };
    getProfile();
  }, []);

  const openTab = (type) => {
    for (let i = 0; i < open.length; i++) {
      if (i === type) {
        open[i] = 1;
      } else {
        open[i] = 0;
      }
    }
    setOpen(open);
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
        <Tab active={open[0]} onClick={() => openTab(0)}>
          Reviews
        </Tab>
        <Tab active={open[1]} onClick={() => openTab(1)}>
          Topics
        </Tab>
        <Tab active={open[2]} onClick={() => openTab(2)}>
          Bookshelf
        </Tab>
      </TabList>
      <TabContent open={open[0]}>
        {profile?.data?.bookReviews.map((b, i) => (
          <BookReviews key={i}>{b}</BookReviews>
        ))}
      </TabContent>
      <TabContent open={open[1]}>
        {profile?.data?.preferredTopics.map((b, i) => (
          <BookReviews key={i}>{b}</BookReviews>
        ))}
      </TabContent>
    </div>
  );
};

export default Profile;
