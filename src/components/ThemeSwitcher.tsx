
import React, { useState, useEffect } from 'react';

const THEMES = ['light', 'dark', 'neon'];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <div className="theme-switcher">
      <label htmlFor="theme-select">Theme:</label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        {THEMES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;
