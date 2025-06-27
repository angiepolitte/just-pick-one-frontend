import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterLocation from "./components/EnterLocation";
import Results from "./components/Results";
import RandomResult from "./components/RandomResult";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
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
