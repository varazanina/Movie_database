import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const OMDB_API_KEY = '19a050db';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=movie`);
        setMovies(response.data.Search);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [OMDB_API_KEY]);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie: Movie) => (
            <ul>
                <h1 key={movie.imdbID}>{movie.Title}</h1>
                <img key={movie.imdbID} src={movie.Poster} alt="Poster" />
            </ul>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
