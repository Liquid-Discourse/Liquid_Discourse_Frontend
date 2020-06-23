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
  const seenTags = new Set();
  const uniqueTags = allTags.filter((tag) => {
    const testFragment = JSON.stringify(tag);
    const duplicate = seenTags.has(testFragment);
    seenTags.add(testFragment);
    return !duplicate;
  });
  // sort by book count
  uniqueTags.sort((tagA, tagB) => tagB?.bookCount - tagA?.bookCount);
  // bucket them into categories
  const categorizedTags = {
    COUNTRY: [],
    TOPIC: [],
    AFFAIR: [],
    GENRE: [],
  };
  uniqueTags.forEach((tag) => {
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
    ALL: uniqueTags,
    CATEGORIZED: categorizedTags,
  };
};
