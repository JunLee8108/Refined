import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav>
        <ul className="brand-name display-flex-start">
          <div className="brand-name-box-1">
            <h1>Refined</h1>
            <h4>Seoul</h4>
          </div>
          <div className="brand-name-box-2">
            <li>MEN</li>
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
    </div>
  );
}

export default Navbar;
