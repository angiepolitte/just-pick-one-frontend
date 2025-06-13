import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import EnterLocation from "./components/EnterLocation";
import Results from "./components/Results";
import RandomResult from "./components/RandomResult";
import borderBackground from "./assets/restaurant border.avif";

function App() {
  return (
    <>
      {/* <div
        style={{
          backgroundImage: `url(${borderBackground})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterLocation />} />
          <Route path="/results" element={<Results />} />
          <Route path="/random-result" element={<RandomResult />} />
        </Routes>
      </BrowserRouter>
      <footer className="app-footer">
        <p>A Work In Progress by Angie Politte © 2025</p>
      </footer>
    </>
  );
}

export default App;
