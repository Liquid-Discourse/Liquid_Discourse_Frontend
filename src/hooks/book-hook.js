import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "react-auth0-spa";

const useBook = (id) => {
  const { user, getTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [book, setBook] = useState({});

  const getData = async () => {
    setLoading(true);
    // query the server for the tag
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/books/${id}`
    );
    if (!response?.data) {
      setError(true);
      setLoading(false);
      return;
    }
    const book = response.data;
    setBook(book);
    setLoading(false);
    console.log(book);
    console.log(user);
  };

  const addToBookshelf = async () => {
    if (user != null) {
      const token = await getTokenSilently();
      // check if book review exists already
      // in which case, skip
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/book-reviews`,
        {
          params: {
            bookId: id,
            userId: user.database.id,
          },
        }
      );
      const bookReview = response.data?.length && response.data[0];
      if (bookReview) {
        return;
      }

      // add to bookshelf
      await axios.post(
        `${process.env.REACT_APP_API_URL}/book-reviews`,
        {
          bookId: id,
          isCompleted: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return {
    loading,
    error,
    book,
    addToBookshelf,
  };
};

export default useBook;
