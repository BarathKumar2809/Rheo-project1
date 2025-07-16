import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(saved);
    }, []);
    console.log('watch')

    return (
        <div className="container">
            <h1 className="heading">Your Watchlist</h1>
            <div className="grid">
                {watchlist.length === 0 ? (
                    <p>No movies added to watchlist.</p>
                ) : (
                    watchlist.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt={movie.title}
                                style={{ width: '200px', borderRadius: '10px' }}
                            />
                            <h3>{movie.title}</h3>
                            <p>⭐ {movie.vote_average}</p>

                            <button
                                onClick={() => {
                                    const updated = watchlist.filter(item => item.id !== movie.id);
                                    localStorage.setItem('watchlist', JSON.stringify(updated));
                                    setWatchlist(updated);
                                }}
                                className="remove-btn"
                            >
                                🗑 Remove from Watchlist
                            </button>
                        </div>

                    ))
                )}
            </div>
        </div>
    );
};

export default Watchlist;
