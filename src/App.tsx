import React, { useState } from 'react';
import NeonTheme from './components/NeonTheme';
import MinimalTheme from './components/MinimalTheme';

function App() {
  const [theme, setTheme] = useState('Neon');

  const switchTheme = () => {
    setTheme(theme === 'Neon' ? 'Minimal' : 'Neon');
  };

  return (
    <div>
      {theme === 'Neon' ? (
        <NeonTheme switchTheme={switchTheme} />
      ) : (
        <MinimalTheme switchTheme={switchTheme} />
      )}
    </div>
  );
}

export default App;
