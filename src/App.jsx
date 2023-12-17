import { useEffect, useState } from "react";
import Auth from "./components/Auth";

import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function App() {
  const [movieList, setMovieList] = useState([]);

  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isWatch, setIsWatch] = useState(true);

  const movieCollectionRef = collection(db, "movies");

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

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      setMovieList((prevMovieList) =>
        prevMovieList.filter((movie) => movie.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const submitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movieTitle,
        releaseDate: releaseDate,
        watched: isWatch,
      });
      getMovieList();
      setMovieTitle("");
      setIsWatch(false);
      setReleaseDate(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>firebase finishing</h1>
      <Auth />
      <div>
        <label htmlFor="movieName">Title:</label>
        <input
          type="text"
          name="movieName"
          id="movieName"
          placeholder="movie name.."
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <br />
        <label htmlFor="date">Release Date:</label>
        <input
          type="number"
          name="date"
          id="date"
          placeholder="Release date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <br />
        <input
          type="checkbox"
          name="watch"
          id="watch"
          checked={isWatch}
          onChange={(e) => setIsWatch(e.target.checked)}
        />
        <label htmlFor="watch">Watch:</label>
        <br />
        <button onClick={submitMovie}>submit movie</button>
      </div>

      {movieList.map((movie, index) => (
        <article key={index}>
          <h3 style={{ color: movie.watched ? "green" : "red" }}>
            Movie Name: {movie.title}
          </h3>
          <p>Release Date: {movie.releaseDate}</p>
          <p>Watch: {movie.watched ? "Seen" : "Unseen"}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete</button>
        </article>
      ))}
    </>
  );
}
