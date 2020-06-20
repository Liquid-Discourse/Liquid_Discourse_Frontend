import React, { useEffect, useState } from "react";
import { useAuth0 } from "react-auth0-spa";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Title = styled.div`
  font-size: 3.3vh;
  font-family: Montaga;
  margin-bottom: 5%;
`;
const Box = styled.div`
  border: 1px solid rgb(240, 240, 240);
  padding: 14px 16px;
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  font-family: Poppins;
  font-size: 13px;
  margin-right: 10px;
`;
const Button = styled.button`
  font-family: Poppins;
  font-size: 13px;
  padding: 5px 7px;
  border: ${(props) => (props.delete ? "1px solid red" : "1px solid #64dd17")};
  background-color: ${(props) => (props.deleteUser ? "red" : "white")};
  border-radius: 5px;
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

const Settings = () => {
  const { loading, user, getTokenSilently, logout } = useAuth0();
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [publicProf, setPublicProf] = useState();
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    setUsername(user?.database?.username);
    setPublicProf(user?.database?.profileIsPublic);
  }, [user]);

  const handleSubmit = async () => {
    const token = await getTokenSilently();
    console.log("username", username);
    console.log("deleteuser", deleteUser);
    console.log("public", publicProf);
    if (deleteUser === true) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
    }
    await axios.patch(
      `${process.env.REACT_APP_API_URL}/users`,
      { username: username, profileIsPublic: publicProf },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    history.push({ pathname: "/" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Title>Settings</Title>
        <Button type="button" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
      <Box>
        <Label>Change Username: </Label>
        <input
          style={{
            padding: "10px 12px",
            width: "70%",
            border: "1px solid #ccc",
            color: "grey",
          }}
          name="username"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box>
        <Label>Make Profile Private: </Label>
        <Switch>
          <SwitchInput
            type="checkbox"
            active={publicProf}
            onClick={() => {
              setPublicProf((publicProf) => !publicProf);
            }}
          />
          <Slider class="slider round"></Slider>
        </Switch>
      </Box>
      <Box>
        <Label>Delete Account:</Label>
        <Button
          delete
          deleteUser={deleteUser}
          type="button"
          onClick={() => {
            setDeleteUser((deleteUser) => !deleteUser);
          }}
        >
          Delete Account
        </Button>
      </Box>
    </div>
  );
};

export default withRouter(Settings);
