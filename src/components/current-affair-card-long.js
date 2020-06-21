import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";
import { getRelatedTags } from "../utils/api-helpers";

const Border = styled.div`
  font-family: Poppins;
  box-shadow: 2px 2px 8px #d7ccc8;
  border-radius: 5px;
  width: 100%;
  height: auto;
  margin-bottom: 10%;
  margin-right: 5%;
  padding: 2% 4%;
  position: relative;
  font-size: 12px;
  &:hover {
    background-color: #ffe0b2;
  }
`;
const TopicWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const TopicPill = styled.button`
  font-family: Poppins;
  width: 100%;
  background-color: white;
  margin-top: 10px;
  padding: 5px 5px;
  text-align: left;
  margin-right: 5px;
  margin-left: 5px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-family: Montaga;
  word-wrap: break-word;
  padding-bottom: 5px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
  border-radius: 3px;
  padding: 2px 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const Card = ({ id, slug, name, upvotes, books, recommenders }) => {
  const [topics, setTopics] = useState(null);
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/current-affairs/" + id });
  };

  const redirectToTopic = (id) => {
    history.push({ pathname: "/topics/" + id });
  };

  useEffect(() => {
    const getTags = async () => {
      let topics = await getRelatedTags(id);
      console.log("topics", topics);
      topics = topics.CATEGORIZED.TOPIC;
      if (topics.length > 3) {
        topics = topics.slice(3);
      }
      setTopics(topics);
    };

    getTags();
  }, []);

  return (
    <Border>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        onClick={() => redirectCurrentAffair(id)}
      >
        <div>
          <Title>{name}</Title>
          <div>description</div>
        </div>
        <Wrapper>
          <Item>
            <div style={{ fontSize: "18px" }}>{books}</div>
            <div>books</div>
          </Item>
          <Item>
            <div style={{ fontSize: "18px" }}>{books}</div>
            <div>books</div>
          </Item>
        </Wrapper>
      </div>
      <br />
      <div>
        <div>Top Topics: </div>
        <TopicWrapper>
          {topics?.map((t, i) => (
            <TopicPill onClick={() => redirectToTopic(t.slug)} key={i}>
              <div>{t.name}</div>
              <div>{t.bookCount}</div>
            </TopicPill>
          ))}
        </TopicWrapper>
      </div>
    </Border>
  );
};

export default withRouter(Card);
