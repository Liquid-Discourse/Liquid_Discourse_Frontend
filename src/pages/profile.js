import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

const Profile = () => {
  const { loading, user, getTokenSilently, getIdTokenClaims } = useAuth0();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getFullProfile = async () => {
      const token = await getTokenSilently();
      await console.log(token);
      const profile = await axios.get("http://localhost:7000/auth/test", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      await console.log(profile);
      setProfile(profile);
    };
    getFullProfile();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Via useAuth0 user</h1>
      <img src={user.picture} alt="Profile" width="100" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      <h1>Via getProfile() from the backend</h1>
      <img src={profile?.data?.picture} alt="Profile" width="100" />
      <code>{JSON.stringify(profile, null, 2)}</code>
    </>
  );
};

export default Profile;
