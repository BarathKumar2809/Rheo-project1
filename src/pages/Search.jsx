
import React, { useState, useEffect } from 'react';
import { searchMovies, getGenres, discoverMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import '../styles/Home.css';
import '../styles/Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getGenres().then(data => setGenres(data.genres));
    }, []);


    useEffect(() => {
        setLoading(true);

        const delay = setTimeout(() => {
            if (query.trim()) {
                // Use searchMovies API
                searchMovies(query)
                    .then(data => {
                        let filtered = data.results;

                        if (selectedGenre) {
                            filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
                        }

                        if (selectedYear) {
                            filtered = filtered.filter(movie => movie.release_date?.startsWith(selectedYear));
                        }

                        if (selectedRating) {
                            filtered = filtered.filter(movie => movie.vote_average >= selectedRating);
                        }

                        setResults(filtered);
                    })
                    .catch(console.error)
                    .finally(() => setLoading(false));
            } else {
                // Use discoverMovies API
                discoverMovies({
                    genre: selectedGenre,
                    year: selectedYear,
                    rating: selectedRating,
                })
                    .then(data => setResults(data.results))
                    .catch(console.error)
                    .finally(() => setLoading(false));
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [query, selectedGenre, selectedYear, selectedRating]);


    const handleReset = () => {
        setQuery('');
        setSelectedGenre('');
        setSelectedYear('');
        setSelectedRating('');
        setResults([]);
    };

    return (
        <div className="container">
            <h1 className="heading">Search Movies</h1>

            <input
                type="text"
                placeholder="Search by title..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="search-input"
            />

            <div className="filters">
                <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
                    <option value="">Genre</option>
                    {genres.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>

                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    <option value="">Year</option>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select value={selectedRating} onChange={e => setSelectedRating(e.target.value)}>
                    <option value="">Rating</option>
                    {[8, 7, 6, 5].map(r => (
                        <option key={r} value={r}>{r}+</option>
                    ))}
                </select>

                <button onClick={handleReset} className="reset-btn">Reset</button>
            </div>

            {loading && <p>Loading...</p>}

            <div className="grid" style={{ marginTop: '20px' }}>
                {results.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Search;
