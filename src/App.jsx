import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import MouseGlow from "./components/MouseGlow";
import Dairy from "./pages/Dairy";
import JournalApp from "./pages/NewJournal";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-white">
        <MouseGlow />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/Dairy" element={<Dairy />} />
          <Route path="/Journal" element={<JournalApp />} />
          <Route path="/J" element={<JournalApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
