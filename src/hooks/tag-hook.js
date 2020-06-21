import { useState, useEffect } from "react";
import { getRelatedTags } from "utils/api-helpers";
import axios from "axios";

const useTag = ({ type, slug }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tag, setTag] = useState({});
  const [relatedTags, setRelatedTags] = useState({});

  const getData = async () => {
    setLoading(true);
    // query the server for the tag
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tags`, {
      params: {
        type: type,
        slug: slug,
      },
    });
    if (!response?.data) {
      setError(true);
      setLoading(false);
      return;
    }
    const tag = response.data[0];
    setTag(tag);
    // get related tags
    const relatedTags = await getRelatedTags(tag.id);
    setRelatedTags(relatedTags);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [type, slug]);

  return {
    loading,
    error,
    tag,
    relatedTags,
  };
};

export default useTag;
