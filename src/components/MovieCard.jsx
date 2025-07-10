
import '../styles/MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (

      
            <Link to={`/movie/${movie.id}`} className="movie-card">
                <img loading= "lazy" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="movie-image" />
                <div className="movie-info">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="movie-meta">⭐ {movie.vote_average} | 📅 {movie.release_date?.slice(0, 4)}</p>
                </div>
            </Link>

            
     
    );
};

export default MovieCard;
