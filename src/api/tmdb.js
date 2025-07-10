const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
};

export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Movie details fetch failed');
  return res.json();
};

export const getMovieCredits = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Credits fetch failed');
  return res.json();
};

export const getGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch genres');
  return res.json();
};

export const getMovieTrailer = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch trailer');
  return res.json();
};

export const getSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch similar movies');
  return res.json();
};

export const discoverMovies = async ({ genre, year, rating }) => {
  const url = new URL(`${BASE_URL}/discover/movie`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('sort_by', 'popularity.desc');
  if (genre) url.searchParams.set('with_genres', genre);
  if (year) url.searchParams.set('primary_release_year', year);
  if (rating) url.searchParams.set('vote_average.gte', rating);
  return fetch(url).then(res => res.json());
};

