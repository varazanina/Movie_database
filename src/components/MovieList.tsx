import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSearchBar from './MovieSearchBar';

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const OMDB_API_KEY = '19a050db';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=movie`
        );
        setMovies(response.data.Search);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [OMDB_API_KEY]);

  const handleSearch = (searchQuery: string) => {
    if (movies) {
      const filteredMovies = movies.filter((movie) => {
        if (movie.Title) {
          return movie.Title.includes(searchQuery);
        }
        return false; // Handle the case where Genre is missing or undefined
      });
      setDisplayedMovies(filteredMovies);
    }
  };

  return (
    <div>
      <h1>Movie List</h1>
      <MovieSearchBar onSearch={handleSearch} />
      <ul>
        {displayedMovies.map((movie: Movie) => (
          <ul key={movie.imdbID}>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt="Poster" />
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
