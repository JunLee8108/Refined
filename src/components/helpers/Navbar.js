import "./Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isHover, setHover] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [handleHover, setHandleHover] = useState("");
  const [navbarModal, setNavbarModal] = useState("");
  const [mobileModal, setMobileModal] = useState("");
  const [menu, setMenu] = useState([]);
  const [menuHTML, setMenuHTML] = useState("");
  const [content, setContent] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContent = (e) => {
    setContent(e);
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
      .get(process.env.PUBLIC_URL + "/db/menu.json")
      .then((result) => {
        setMenu(result.data);
        setLoading(true);
      })
      .catch(() => {
        alert("Falied to load.");
      });
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setMobileModal("brand-name-box-2-mobile-translate");
    }, 100);

    return () => {
      clearTimeout(timer);
      setMobileModal("");
    };
  }, [isMobile]);

  return (
    <div className="navbar-container">
      <nav>
        <ul className="brand-name display-flex-start">
          <div className="brand-name-box-1">
            <h1
              onClick={() => {
                setHover(false);
                setHandleHover("");
                setMobile(false);
                navigate("/");
              }}
            >
              Refined
            </h1>
            <h4>Seoul</h4>
            {/* Mobile View */}
            <div className="mobile-btn">
              <li>
                <button
                  onClick={() => {
                    setMobile((isMobile) => !isMobile);
                    setHover(false);
                    setHandleHover("");
                  }}
                >
                  <h4>MENU</h4>
                </button>
              </li>
            </div>
            {/***************/}
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
                      setMenuHTML(e.target.innerHTML);
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
                  return (
                    <li
                      key={index}
                      onClick={(e) => {
                        navigate(menuHTML + "/" + e.target.innerHTML);
                        setHover(false);
                        setHandleHover("");
                      }}
                    >
                      {content[index]}
                    </li>
                  );
                })}
              </div>
            </div>
            <div className="brand-name-box-2"></div>
          </ul>
          <ul className="nav-menu display-flex-start"></ul>
        </nav>
      ) : null}

      {/* Mobile View */}
      {isMobile ? (
        <div className="mobile-navbar">
          <div className={"brand-name-box-2-mobile " + mobileModal}>
            {isLoading ? (
              menu.map(function (a, index) {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      handleContent(menu[index].catagories);
                      setHandleHover(e.target);
                      setMenuHTML(e.target.innerHTML);
                      setHover(true);
                      setMobile((isMobile) => !isMobile);
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
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
