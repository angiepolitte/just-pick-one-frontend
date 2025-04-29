import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import EnterLocation from "./components/EnterLocation";
import Results from "./components/Results";
import RandomResult from "./components/RandomResult";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterLocation />} />
          <Route path="/results" element={<Results />} />
          <Route path="/random-result" element={<RandomResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
