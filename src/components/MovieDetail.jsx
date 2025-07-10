import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieTrailer, getSimilarMovies } from '../api/tmdb';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarMovies, setSimilarMovies] = useState([]);


    useEffect(() => {
        Promise.all([
            getMovieDetails(id),
            getMovieCredits(id),
            getMovieTrailer(id),
            getSimilarMovies(id),
        ])
            .then(([movieData, creditsData, trailerData, similarData]) => {
                setMovie(movieData);
                setCredits(creditsData.cast.slice(0, 5)); // top 5 cast
                const trailer = trailerData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                setTrailer(trailer);

                setSimilarMovies(similarData.results.slice(0, 6));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading || !movie) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading movie details...</p>;

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-header">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-detail-poster"
                />
                <div className="movie-detail-info">
                    <h1>{movie.title} ({movie.release_date.slice(0, 4)})</h1>
                    <p>⭐ {movie.vote_average}</p>
                    <p>{movie.overview}</p>
                    {trailer && (
                        <a
                            href={`https://www.youtube.com/watch?v=${trailer.key}`}
                            target="_blank"
                            rel="noreferrer"
                            className="trailer-button"
                        >
                            ▶ Watch Trailer
                        </a>
                    )}
                </div>
            </div>

            <div className="movie-detail-cast">
                <h2>Top Cast</h2>
                <ul>
                    {credits.map(c => (
                        <li key={c.cast_id}>
                            <strong>{c.name}</strong> as {c.character}
                        </li>
                    ))}
                </ul>
            </div>

            {similarMovies.length > 0 && (
                <div className="movie-detail-similar">
                    <h2>Similar Movies</h2>
                    <div className="grid">
                        {similarMovies.map(movie => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-image"
                                />
                                <div className="movie-info">
                                    <h2 className="movie-title">{movie.title}</h2>
                                    <p className="movie-meta">⭐ {movie.vote_average}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default MovieDetail;
