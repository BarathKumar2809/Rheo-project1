import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

 useEffect(() => {
  // First, remove both light and dark classes
  document.body.classList.remove('light', 'dark');
  // Add the class based on current theme
  document.body.classList.add(theme);
  // Save theme in localStorage
  localStorage.setItem('theme', theme);
}, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '5px 10px',
        backgroundColor: theme === 'light' ? '#ddd' : '#333',


        
        color: theme === 'light' ? '#000' : '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
      }}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
    </button>
  );
};

export default ThemeToggle;
