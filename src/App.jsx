import { useEffect, useState } from "react";
import Auth from "./components/Auth";

import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

export default function App() {
  const [movieList, setMovieList] = useState([]);

  const movieCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieList();
  }, []);

  return (
    <>
      <h1>firebase finishing</h1>
      <Auth />
      {movieList.map((movie, index) => (
        <article key={index}>
          <h3 style={{ color: movie.watched ? "green" : "red" }}>
            Movie Name: {movie.title}
          </h3>
          <p>Release Date: {movie.releaseDate}</p>
          <p>Watch: {movie.watched ? "Seen" : "Unseen"}</p>
        </article>
      ))}
    </>
  );
}
