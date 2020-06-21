import axios from "axios";

export const getRelatedTags = async (tagId) => {
  // get the tag
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/tags/${tagId}`
  );
  const tag = await response.data;
  if (!tag) {
    return {};
  }
  // compile all the tags
  let allTags = [];
  tag.books.forEach((book) => {
    allTags = [...allTags, ...book.tags];
  });
  // remove duplicates
  allTags = Array.from(new Set(allTags));
  // sort by book count
  allTags.sort((tagA, tagB) => tagB?.bookCount - tagA?.bookCount);
  // bucket them into categories
  const categorizedTags = {
    COUNTRY: [],
    TOPIC: [],
    AFFAIR: [],
    GENRE: [],
  };
  allTags.forEach((tag) => {
    switch (tag.type) {
      case "COUNTRY":
        categorizedTags.COUNTRY.push(tag);
        break;
      case "TOPIC":
        categorizedTags.TOPIC.push(tag);
        break;
      case "AFFAIR":
        categorizedTags.AFFAIR.push(tag);
        break;
      case "GENRE":
        categorizedTags.GENRE.push(tag);
        break;
    }
  });
  return {
    ALL: allTags,
    CATEGORIZED: categorizedTags,
  };
};
