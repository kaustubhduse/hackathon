import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChallengeProvider } from "./components/useContext"; // Ensure this path is correct
import HomePage from "./components/HomePage/HomePage"; // Ensure this path is correct
import CreateChallenge from "./components/CreateChallenge"; // Ensure this path is correct
import DetailPage from "./components/DetailPage"; // Ensure this path is correct
import UpdatePage from "./components/UpdatePage"; // Ensure this path is correct

function App() {
  return (
    <ChallengeProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-challenge" element={<CreateChallenge />} />
            {/* Route for DetailPage with id parameter */}
            <Route path="/detail-page/:id" element={<DetailPage />} />
            {/* Route for UpdatePage with id parameter */}
            <Route path="/update/:id" element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </ChallengeProvider>
  );
}

export default App;
