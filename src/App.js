import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/js/ScrollToTop";
import Home from "./components/pages/Home";
import Navbar from "./components/helpers/Navbar";
import Detail from "./components/pages/Detail";
import Item from "./components/pages/Item";
import Wishlist from "./components/pages/Wishlist";
import Cart from "./components/pages/Cart";
import About from "./components/pages/About";
import Search from "./components/pages/Search";
import Payment from "./components/pages/Payment";
import Account from "./components/pages/Account";
import "./App.css";
import Fade from "./components/helpers/Fade";
import { TransitionGroup } from "react-transition-group";

// import the library
import { library } from "@fortawesome/fontawesome-svg-core";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Item/:category/:type" element={<Item />}></Route>
        <Route
          path="/Detail/:category/:type/:name/:id"
          element={<Detail />}
        ></Route>
        <Route path="/Wishlist" element={<Wishlist />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Search" element={<Search />}></Route>
        <Route path="/Payment" element={<Payment />}></Route>
        <Route path="/Account" element={<Account />}></Route>
      </Routes>
    </div>
  );
}

export default App;
library.add(fab, fas, far);
