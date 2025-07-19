
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import '../styles/Home.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetchPopularMovies(page)
            .then(data => {
                
                setMovies(prev => [...prev, ...data.results]);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [page]);


    return (
        <div className="container">
            <h1 className="heading">Popular Movies</h1>
            <div  className="grid">
                {movies.map((movie,index)=> (
                    <MovieCard key={`${movie.id} -${index}`} movie={movie} />
                ))}
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button className= "big-button" onClick={() => setPage(prev => prev + 1)}  disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            </div>

        </div>
    );
};

export default Home;
