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

  // Menu opacity effect
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

  // Sever request
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

  // Mobile menu transform effect
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
            {/* Not visible on laptop (Mobile Menu Button) */}
            <MobileMenuBtn
              setMobile={setMobile}
              setHover={setHover}
              setHandleHover={setHandleHover}
            />
            {/**********************************************/}
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
                {/* Not visible on laptop */}
                {/* Let users know which button they click (men, women ...) */}
                <MobileIndicator menuHTML={menuHTML} />
                {/***********************************************************/}

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

      {/* Not visible on laptop (Mobile Menu Bar) */}
      {isMobile ? (
        <MobileMenu
          menu={menu}
          handleContent={handleContent}
          setHandleHover={setHandleHover}
          setMenuHTML={setMenuHTML}
          setHover={setHover}
          setMobile={setMobile}
          handleHover={handleHover}
          isLoading={isLoading}
          mobileModal={mobileModal}
        />
      ) : null}
      {/********************************************/}
    </div>
  );
}

function MobileMenuBtn(props) {
  return (
    <div className="mobile-btn">
      <li>
        <button
          onClick={() => {
            props.setMobile((isMobile) => !isMobile);
            props.setHover(false);
            props.setHandleHover("");
          }}
        >
          <h4>Menu</h4>
        </button>
      </li>
    </div>
  );
}

function MobileIndicator(props) {
  return (
    <li
      style={{
        cursor: "unset",
        border: "none",
        fontWeight: "bold",
        letterSpacing: "1px",
      }}
      className="menu-mobile"
    >
      {props.menuHTML}.
    </li>
  );
}

function MobileMenu(props) {
  return (
    <div className="mobile-navbar">
      <div className={"brand-name-box-2-mobile " + props.mobileModal}>
        {props.isLoading ? (
          props.menu.map(function (a, index) {
            return (
              <li
                key={index}
                onClick={(e) => {
                  props.handleContent(props.menu[index].catagories);
                  props.setHandleHover(e.target);
                  props.setMenuHTML(e.target.innerHTML);
                  props.setHover(true);
                  props.setMobile((isMobile) => !isMobile);
                  if (props.handleHover == e.target) {
                    props.setHover(false);
                    props.setHandleHover("");
                  }
                }}
              >
                {props.menu[index].name}
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
  );
}

export default Navbar;
