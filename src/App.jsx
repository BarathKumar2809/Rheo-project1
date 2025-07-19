
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetail from './components/MovieDetail';
import ThemeToggle from './components/ThemeToggle';
import Watchlist from './pages/WatchList';
import Navbar from './components/navbar';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;





