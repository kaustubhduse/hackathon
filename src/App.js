import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChallengeProvider } from "./components/useContext";
import HomePage from "./components/HomePage/HomePage";
import CreateChallenge from "./components/CreateChallenge";
import DetailPage from "./components/DetailPage";
import UpdatePage from "./components/UpdatePage";

function App() {
  return (
    <ChallengeProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-challenge" element={<CreateChallenge />} />
            <Route path="/detail-page/:id" element={<DetailPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </ChallengeProvider>
  );
}

export default App;
