import React, { useState, useEffect } from "react";
import BookCard from "components/book-card";
import TwoCol from "components/layouts/two-col";
import axios from "axios";

// We follow a consistent structure for all tag types!
const TagDetail = (props) => {
  const tagType = props.type;
  const tagSlug = props.match.params.slug;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState({});

  const getTagFromBackend = async () => {
    setLoading(true);
    // get the tag data from the backend
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tags`, {
      params: {
        type: tagType,
        slug: tagSlug,
      },
    });
    // check if tag exists
    if (response?.data?.length !== 1) {
      setError(true);
      setLoading(false);
      return;
    }
    // get first tag in result
    const tag = response.data[0];
    setTag(tag);
    console.log(tag);
    setLoading(false);
  };

  useEffect(() => {
    getTagFromBackend();
  }, [tagType, tagSlug]);

  return (
    <>
      {/* Error and loading */}
      <div>
        {error ? "An error occurred. Please try reloading the page." : ""}
      </div>
      <div>{loading ? "Loading..." : ""}</div>
      {/* Debug */}
      <div>{JSON.stringify(tag, null, 2)}</div>
      {/* Content */}
      <div style={{ margin: "5%" }}>
        <div>{tag?.name}</div>
        {tag?.books?.map((b, i) => (
          <BookCard
            key={i}
            id={b.div}
            name={b.name}
            authors={b.authors}
            topics=""
            recommenders={b.reviewCount}
            rating={b.averageRatingOutOfFive}
          />
        ))}
      </div>
    </>
  );
};

export default TagDetail;
