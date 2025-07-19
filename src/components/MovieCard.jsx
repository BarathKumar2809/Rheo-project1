
import '../styles/MovieCard.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MovieCard = ({ movie }) => {
  const addToWatchlist = (e) => {
    e.preventDefault(); // prevent <Link> click
    e.stopPropagation(); // stop bubbling up

    const existing = JSON.parse(localStorage.getItem('watchlist')) || [];
    const exists = existing.find(m => m.id === movie.id);

    if (!exists) {
      localStorage.setItem('watchlist', JSON.stringify([...existing, movie]));
      toast.success('✅ Added to watchlist!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
      });
    } else {
      toast.info('⚠️ Already in watchlist.', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="movie-image"
        />
      </Link>

      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-meta">
          ⭐ {movie.vote_average} | 📅 {movie.release_date?.slice(0, 4)}
        </p>

        <button onClick={addToWatchlist} className="watchlist-btn">
          ➕ Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
