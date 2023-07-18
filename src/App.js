import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/js/ScrollToTop";
import Home from "./components/pages/Home";
import Navbar from "./components/helpers/Navbar";
import Detail from "./components/pages/Detail";
import Item from "./components/pages/Item";
import Wishlist from "./components/pages/Wishlist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Item/:category/:type" element={<Item />}></Route>
          <Route path="/Detail/:category/:type/:name/:id" element={<Detail />}></Route>
          <Route path="/Wishlist" element={<Wishlist/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
