import { clear } from "@testing-library/user-event/dist/clear";
import "./Navbar.css";
import { useState, useEffect } from "react";

function Navbar() {
  const [isHover, setHover] = useState(false);
  const [navbarModal, setNavbarModal] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setNavbarModal("show-modal");
    }, 100);

    return () => {
      clearTimeout(timer);
      setNavbarModal("");
    };
  }, [isHover]);

  return (
    <div className="navbar-container">
      <nav>
        <ul className="brand-name display-flex-start">
          <div className="brand-name-box-1">
            <h1>Refined</h1>
            <h4>Seoul</h4>
          </div>
          <div className="brand-name-box-2">
            <li
              onClick={() => {
                setHover(isHover => !isHover);
              }}
            >
              MEN
            </li>
            <li>WOMEN</li>
            <li>ACCESSORIES</li>
            <li>COLLECTIONS</li>
          </div>
        </ul>
        <ul className="nav-menu display-flex-start">
          <li>ACCOUNT</li>
          <li>WISHLIST</li>
          <li>BAG</li>
        </ul>
      </nav>

      {isHover ? (
        <nav className={"navbar-modal " + navbarModal}>
          <ul className="brand-name display-flex-start">
            <div className="brand-name-box-1 flex-column">
              <div>
                <li>‣ New Arrival</li>
                <li>‣ Coats & Jackets</li>
                <li>‣ Shirts</li>
                <li>‣ Kintwear</li>
                <li>‣ Jeans</li>
                <li>‣ Pants</li>
              </div>
            </div>
            <div className="brand-name-box-2"></div>
          </ul>
          <ul className="nav-menu display-flex-start"></ul>
        </nav>
      ) : null}
    </div>
  );
}

export default Navbar;
