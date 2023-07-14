import "./Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const [isHover, setHover] = useState(false);
  const [handleHover, setHandleHover] = useState("");
  const [navbarModal, setNavbarModal] = useState("");
  const [menu, setMenu] = useState([]);
  const [content, setContent] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const handleContent = (e) => {
    setContent(e);
    console.log();
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setNavbarModal("show-modal");
    }, 100);

    return () => {
      clearTimeout(timer);
      setNavbarModal("");
    };
  }, [isHover]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setNavbarModal("show-modal");
    }, 100);

    return () => {
      clearTimeout(timer);
      setNavbarModal("");
    };
  }, [content]);

  useEffect(() => {
    axios
      .get("./db/menu.json")
      .then((result) => {
        setMenu(result.data);
        setLoading(true);
      })
      .catch(() => {
        alert("Falied to load.");
      });
  }, []);

  return (
    <div className="navbar-container">
      <nav>
        <ul className="brand-name display-flex-start">
          <div className="brand-name-box-1">
            <h1
              onClick={() => {
                setHover(false);
                setHandleHover("");
              }}
            >
              Refined
            </h1>
            <h4>Seoul</h4>
          </div>
          <div className="brand-name-box-2">
            {isLoading ? (
              menu.map(function (a, index) {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      handleContent(menu[index].catagories);
                      setHandleHover(e.target);
                      setHover(true);
                      if (handleHover == e.target) {
                        setHover(false);
                        setHandleHover("");
                      }
                    }}
                  >
                    {menu[index].name}
                  </li>
                );
              })
            ) : (
              <div>
                <h1>loading..</h1>
              </div>
            )}
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
                {content.map(function (a, index) {
                  return <li key={index}>{content[index]}</li>;
                })}
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
