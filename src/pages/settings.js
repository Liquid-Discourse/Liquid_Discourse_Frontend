import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

const Settings = () => {
  const { loading, user } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <>
      <h1>Via getSettings() from the backend</h1>
      <img src={user?.database?.picture} alt="Profile" width="100" />
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};

export default Settings;
