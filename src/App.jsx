import React, { useEffect, useState } from "react";
import Search from "./Component/Search.jsx";
import Spinner from "./Component/Spinner.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const res = await fetch(endPoint, API_OPTIONS);

      if (!res.ok) {
        throw new Error(`Failed to fetch movies`);
      }
      const data = await res.json();

      if (!data.Response === false) {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies : ${error}`);
    } finally {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper text-amber-50">
        <header>
          <img src="/hero.png" alt="hero-image" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Enjoy
            Without The Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <p className="text-white">
              {" "}
              <Spinner />
            </p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id} className="text-white">
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
