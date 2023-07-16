import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/js/ScrollToTop";
import Home from "./components/pages/Home";
import Navbar from "./components/helpers/Navbar";
import Men from "./components/pages/Men";
import Women from "./components/pages/Women";
import Accessories from "./components/pages/Accessories";
import Detail from "./components/pages/Detail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Men/:id" element={<Men />}></Route>
          <Route path="/Women/:id" element={<Women />}></Route>
          <Route path="/Accessories/:id" element={<Accessories />}></Route>
          <Route path="/Detail/:id/:name" element={<Detail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
