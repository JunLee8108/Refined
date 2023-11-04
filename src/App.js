import ScrollToTop from "./components/js/ScrollToTop";
import Home from "./components/pages/Home";
import Navbar from "./components/helpers/Navbar";
import "./App.css";
import LoadingHeight100 from "./components/helpers/LoadingHeight100";

import { Suspense, lazy } from "react";

// import the library
import { library } from "@fortawesome/fontawesome-svg-core";
import { Routes, Route } from "react-router-dom";

// import your icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

const Detail = lazy(() => import("./components/pages/Detail"));
const Item = lazy(() => import("./components/pages/Item"));
const Wishlist = lazy(() => import("./components/pages/Wishlist"));
const Cart = lazy(() => import("./components/pages/Cart"));
const About = lazy(() => import("./components/pages/About"));
const Search = lazy(() => import("./components/pages/Search"));
const Payment = lazy(() => import("./components/pages/Payment"));
const Account = lazy(() => import("./components/pages/Account"));

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/Item/:category/:type"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Item />
            </Suspense>
          }
        />
        <Route
          path="/Detail/:category/:type/:name/:id"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Detail />
            </Suspense>
          }
        />
        <Route
          path="/Wishlist"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Wishlist />
            </Suspense>
          }
        />
        <Route
          path="/Cart"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/About"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/Search"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/Payment"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Payment />
            </Suspense>
          }
        />
        <Route
          path="/Account"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Account />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
library.add(fab, fas, far);
