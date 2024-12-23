import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Recommendation from "./pages/recommendation.jsx";

function App() {

  return (

    <div className="custom-cursor">
    <Router>
      <Routes>
      <Route path="/" element={<Recommendation />} />
      
      
      </Routes>
    </Router>
    </div>

  );
}

export default App
