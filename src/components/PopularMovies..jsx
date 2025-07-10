import  { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/tmdb';

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularMovies()
      .then(data => setMovies(data.results))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {movies.map(movie => (
        <div key={movie.id} className="bg-white shadow rounded p-2">
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <p>⭐ {movie.vote_average} | 📅 {movie.release_date?.slice(0, 4)}</p>
        </div>
      ))}
    </div>
  );
}

export default PopularMovies;
