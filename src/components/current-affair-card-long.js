import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";
import { getRelatedTags } from "../utils/api-helpers";

const Border = styled.div`
  font-family: Poppins;
  /* box-shadow: 2px 2px 8px #d7ccc8; */
  background: #f5f2ef;
  box-shadow: 5px 5px 14px #d0cecb, -5px -5px 14px #ffffff;
  border-radius: 5px;
  /* width: 100%; */
  height: auto;
  /* margin-bottom: 10%; */
  /* margin-right: 5%; */
  padding: 2% 4%;
  /* position: relative; */
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #ffe0b2;
  }
`;
const TopicWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
`;
const TopicPill = styled.button`
  font-family: Poppins;
  width: 100%;
  background: #f5f2ef;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
  margin-top: 10px;
  padding: 5px 15px;
  text-align: left;
  margin-right: 5px;
  margin-left: 5px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  &:hover {
    background-color: rgb(240, 240, 240);
    box-shadow: 5px 5px 10px #e6e3e1, -5px -5px 10px #fffffd;
  }
  cursor: pointer;
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
  background-color: rgb(230, 230, 230);
  border-radius: 3px;
  padding: 5px 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const Card = ({ id, slug, name, upvotes, books, recommenders }) => {
  const [topics, setTopics] = useState(null);
  const [topicCount, setTopicCount] = useState(0);
  const history = useHistory();

  const redirectToPage = (path) => {
    history.push({ pathname: path });
  };

  useEffect(() => {
    const getTags = async () => {
      const relatedTags = await getRelatedTags(id);
      let topics = relatedTags.CATEGORIZED.TOPIC;
      setTopicCount(relatedTags.CATEGORIZED.TOPIC.length);
      if (topics.length > 5) {
        topics = topics.slice(0, 5);
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
        onClick={() => redirectToPage(`/current-affairs/${slug}`)}
      >
        <div>
          <Title>{name}</Title>
          <div>description</div>
        </div>
        <Wrapper>
          <Item>
            <div style={{ fontSize: "18px" }}>{topicCount}</div>
            <div>topics</div>
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
            <TopicPill
              onClick={() => redirectToPage(`/topics/${t.slug}`)}
              key={i}
            >
              <div>{t.name}</div>
              <div>{t.bookCount} books</div>
            </TopicPill>
          ))}
        </TopicWrapper>
      </div>
    </Border>
  );
};

export default withRouter(Card);
