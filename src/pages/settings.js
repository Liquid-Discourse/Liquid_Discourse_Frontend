import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

const Settings = () => {
  const { loading, user, getTokenSilently, getIdTokenClaims } = useAuth0();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      const token = await getTokenSilently();
      await console.log(token);
      const settings = await axios.get("http://localhost:7000/users/settings", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSettings(settings);
    };
    getSettings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <>
      <h1>Via getSettings() from the backend</h1>
      <img src={settings?.data?.database?.picture} alt="Profile" width="100" />
      <code>{JSON.stringify(settings, null, 2)}</code>
    </>
  );
};

export default Settings;
