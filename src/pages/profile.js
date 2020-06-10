import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

const Profile = (props) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `http://localhost:7000/users/profile/${props.match.params.username}`
      );
      setProfile(profile);
    };
    getProfile();
  }, []);

  return (
    <>
      <h1>Public profile for {profile?.data?.firstName}</h1>
      <img src={profile?.data?.picture} alt="Profile" width="100" />
      <code>{JSON.stringify(profile, null, 2)}</code>
    </>
  );
};

export default Profile;
