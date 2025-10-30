import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NeonTheme from "./components/NeonTheme";
import SimpleView from "./components/SimpleView";
import CustomView from "./components/CustomView";
import Personalities from './pages/Personalities';

function App() {
  const theme = window.localStorage.getItem("siteTheme") || "neon";

  return (
    <Router>
      <Routes>
        <Route path="/" element={theme === 'simple' ? <SimpleView /> : theme === 'custom' ? <CustomView /> : <NeonTheme />} />
        <Route path="/personalities" element={<Personalities />} />
      </Routes>
    </Router>
  );
}

export default App;
