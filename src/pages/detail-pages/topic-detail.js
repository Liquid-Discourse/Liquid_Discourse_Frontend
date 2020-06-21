import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import BookCard from "components/book-card";
import TwoCol from "components/layouts/two-col";

import { getRelatedTags } from "utils/api-helpers";

const TopicPill = styled.button`
  font-family: Poppins;
  width: 100%;
  background-color: white;
  margin-top: 10px;
  padding: 5px 10px;
  text-align: left;
  margin-right: 5px;
  margin-left: 5px;
  border: 1px solid #d7ccc8;
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

const Subtitle = styled.div`
  /* margin-top: 5%; */
  font-size: 15px;
  font-family: Poppins;
`;

// We follow a consistent structure for all tag types!
const TopicDetail = (props) => {
  let tagSlug = props.match.params.slug;

  const history = useHistory();
  const [topics, setTopics] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState({});
  const [relatedTags, setRelatedTags] = useState({});

  const getTagFromBackend = async () => {
    setLoading(true);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tags`, {
      params: {
        type: "TOPIC",
        slug: tagSlug,
      },
    });
    if (!response?.data) {
      return;
    }

    const tag = response.data[0];
    const relatedTags = await getRelatedTags(tag.id);
    setRelatedTags(relatedTags);

    console.log(relatedTags);

    // const relatedTopics = relatedTopics.CATEGORIZED.TOPIC;
    // if (relatedTopics.length > 3) {
    //   relatedTopics = relatedTopics.slice(3);
    // }
    // setTopics(relatedTopics);

    setTag(tag);
    setLoading(false);
  };

  useEffect(() => {
    getTagFromBackend();
  }, [tagType, tagSlug]);

  const redirectToPage = (path) => {
    history.push({ pathname: path });
  };

  return (
    <div style={{ marginTop: "5%" }}>
      {/* Error and loading */}
      <div>
        {error ? "An error occurred. Please try reloading the page." : ""}
      </div>
      <div>{loading ? "Loading..." : ""}</div>
      {/* Content */}
      <TwoCol
        left={
          <>
            <Title>Topic: {tag?.name}</Title>
            <div style={{ display: "flex" }}>
              {tag?.books?.map((b, i) => (
                <BookCard
                  key={i}
                  id={b.div}
                  name={b.name}
                  authors={b.authors}
                  topics={b.tags[0]?.name}
                  recommenders={b.reviewCount}
                  rating={b.averageRatingOutOfFive}
                />
              ))}
            </div>
          </>
        }
        right={
          <>
            <div>
              <Subtitle
                style={{
                  marginBottom: "4%",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
              >
                Related Topics
              </Subtitle>
              {relatedTags?.CATEGORIZED?.TOPIC?.map((tag, i) => (
                <TopicPill
                  onClick={() => redirectToPage(`/topics/${tag.slug}`)}
                  key={i}
                >
                  <div style={{ fontSize: "15px", marginBottom: "5px" }}>
                    {tag.name}
                  </div>
                  <div>{tag.bookCount} books under this topic</div>
                </TopicPill>
              ))}
            </div>
          </>
        }
      ></TwoCol>
    </div>
  );
};

export default withRouter(TagDetail);
