import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/js/ScrollToTop";
import Home from "./components/pages/Home";
import Navbar from "./components/helpers/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
