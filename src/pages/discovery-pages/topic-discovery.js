import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "components/current-affair-card-long";
import styled from "styled-components";
import axios from "axios";

const AddCard = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px rgb(230, 230, 230);
  border-radius: 5px;
  width: 100%;
  height: 70px;
  margin: 1%;
  padding: 1% 2%;
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ff9e80;
  }
`;
const Title = styled.div`
  margin-top: 5%;
  font-size: 2.7vh;
  font-family: Montaga;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 5%;
`;

const TopicDiscovery = (props) => {
  const [topics, setTopics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getTopics = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tags/`,
        {
          params: {
            type: "TOPIC",
          },
        }
      );
      setTopics(response.data);
    };
    getTopics();
  }, []);

  const redirectToPath = (path) => {
    history.push({ pathname: path });
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "5%" }}>
      <Title>Topics</Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <AddCard>
          <div style={{ display: "flex" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 0 40 40"
              width="40"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <div style={{ fontFamily: "Poppins" }}>Submit a Topic</div>
          </div>
        </AddCard>
        <div>
          {topics?.map((topic, i) => (
            <Card
              onClick={() => redirectToPath(`/topics/${topic.slug}`)}
              key={i}
              id="black-lives-matter"
              name={topic.name}
              upvotes="something"
              books={topic.books.length}
              recommenders="10 recommenders"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDiscovery;
