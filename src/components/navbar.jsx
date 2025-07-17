
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🎬 Movie App</div>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
