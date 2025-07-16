
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetail from './components/MovieDetail';
import ThemeToggle from './components/ThemeToggle';
import Watchlist from './pages/WatchList';
import './App.css'

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}>
        <div>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/watchlist">WatchList</Link>
        </div>
       <ThemeToggle />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;





