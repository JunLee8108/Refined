import "./Navbar.css";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();

  const [isModal, setModal] = useState(false);
  const [navbarModal, setNavbarModal] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [contentName, setContentName] = useState("");
  const [mobileModal, setMobileModal] = useState("");

  const [menu, setMenu] = useState([]);
  const [menuHTML, setMenuHTML] = useState("");
  const [content, setContent] = useState([]);
  const [icons, setIcon] = useState(faBars);

  const isMounted = useRef(false);

  const navigateCloseModal = (url) => {
    navigate(url);
    setNavbarModal(false);
    setContentName("");
    setMobile(false);
  };

  const mobileCloseModal = () => {
    setContentName("");
    setMobileModal((mobileModal) => !mobileModal);
    setNavbarModal(false);
    setModal(false);
  };

  useEffect(() => {
    if (mobileModal === true) {
      setIcon("fa-solid fa-square-xmark");
    } else if (navbarModal === true) {
      setIcon("fa-solid fa-left-long");
    } else {
      setIcon(faBars);
    }
  }, [mobileModal, navbarModal]);

  // Navbar modal control
  const modalControl = (e, category) => {
    setContent(category);
    setContentName(e.target);
    setMenuHTML(e.target.innerHTML);

    setNavbarModal(true);

    setMobile(false);
    setMobileModal((mobileModal) => !mobileModal);

    if (contentName === e.target) {
      setNavbarModal(false);
      setContentName("");
    } else if (contentName !== "") {
      if (contentName !== e.target) {
        setModal(false);
        setMobile(false);
        setNavbarModal(true);
      }
    }
  };

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

  // Control transition effects
  useEffect(() => {
    if (content.length !== 0) {
      let timer;

      if (navbarModal) {
        setModal(true);
      } else if (!navbarModal) {
        timer = setTimeout(() => {
          setModal(false);
        }, 200);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [navbarModal, content]);

  // Control mobile transition effects
  useEffect(() => {
    if (isMounted.current) {
      let timer;

      if (mobileModal) {
        setMobile(true);
      } else if (!mobileModal) {
        timer = setTimeout(() => {
          setMobile(false);
        }, 200);
      }

      return () => {
        clearTimeout(timer);
      };
    } else {
      isMounted.current = true;
    }
  }, [mobileModal]);

  // Page Change Detection
  useEffect(() => {
    if (navbarModal === true || mobileModal === true) {
      setNavbarModal(false);
      setMobileModal(false);
    }
  }, [window.location.pathname]);

  return (
    <div className="navbar-container">
      <nav>
        <ul className="brand-name display-flex-start">
          <div className="brand-name-box-1">
            <h1
              onClick={() => {
                navigateCloseModal("/");
                setMobileModal(false);
              }}
            >
              Refined
            </h1>
            <h4>Seoul</h4>

            {/* Not visible on laptop (Mobile Menu Button) */}
            <MobileMenuBtn mobileCloseModal={mobileCloseModal} icons={icons} />
            {/**********************************************/}
          </div>

          <div className="brand-name-box-2">
            {isLoading
              ? menu.map(function (a, index) {
                  return (
                    <div key={index}>
                      <li
                        onClick={(e) => {
                          modalControl(e, menu[index].categories);
                        }}
                      >
                        {menu[index].name}
                      </li>
                    </div>
                  );
                })
              : null}
            <li
              onClick={() => {
                navigate("/About");
              }}
            >
              ABOUT US
            </li>
          </div>
        </ul>

        <ul className="nav-menu display-flex-start">
          <li>
            <FontAwesomeIcon icon="fa-solid fa-user-large" size="lg" />
          </li>
          <li
            onClick={() => {
              navigateCloseModal("/Wishlist");
            }}
          >
            WISHLIST
          </li>
          <li
            onClick={() => {
              navigateCloseModal("/Cart");
            }}
          >
            BAG
          </li>
        </ul>
      </nav>

      {isModal ? (
        <nav
          className={
            navbarModal ? "navbar-modal animated" : "navbar-modal animated-hide"
          }
        >
          <ul className="brand-name display-flex-start">
            <div className="brand-name-box-1 flex-column">
              <div>
                {/* Not visible on laptop. Let users know which button they click (men, women ...) */}
                <MobileIndicator
                  menuHTML={menuHTML}
                  mobileCloseModal={mobileCloseModal}
                />
                {/***********************************************************/}

                <center>
                  <div
                    className="border-line-navbar"
                    style={{ width: "78%" }}
                  ></div>
                </center>

                {content.map(function (a, index) {
                  return (
                    <li
                      key={index}
                      onClick={(e) => {
                        navigate("Item/" + menuHTML + "/" + e.target.innerHTML);
                        setNavbarModal(false);
                        setContentName("");
                      }}
                    >
                      {content[index]}
                    </li>
                  );
                })}
              </div>
            </div>
            {/* <div className="brand-name-box-2"></div> */}
          </ul>
          <ul className="nav-menu display-flex-start"></ul>
        </nav>
      ) : null}

      <nav>
        {isMobile ? (
          <div
            className={
              mobileModal
                ? "mobile-navbar animated"
                : "mobile-navbar animated-hide"
            }
          >
            {isLoading
              ? menu.map(function (a, index) {
                  return (
                    <div key={index}>
                      <li
                        onClick={(e) => {
                          modalControl(e, menu[index].categories);
                        }}
                      >
                        {menu[index].name}
                      </li>
                    </div>
                  );
                })
              : null}
            <li
              onClick={() => {
                navigate("/About");
              }}
            >
              ABOUT US
            </li>
            <center>
              <div className="border-line-navbar"></div>
            </center>
            <li>
              <FontAwesomeIcon icon="fa-solid fa-user-large" size="lg" />
            </li>
            <li
              onClick={() => {
                navigateCloseModal("/Wishlist");
              }}
            >
              WISHLIST
            </li>
            <li
              className="mobile-navbar-bag"
              onClick={() => {
                navigateCloseModal("/Cart");
              }}
            >
              BAG
            </li>
          </div>
        ) : null}
      </nav>
    </div>
  );
}

function MobileMenuBtn(props) {
  return (
    <div className="mobile-btn">
      <li>
        <button onClick={props.mobileCloseModal}>
          <FontAwesomeIcon icon={props.icons} size="xl" />
        </button>
      </li>
    </div>
  );
}

function MobileIndicator(props) {
  return (
    <li className="menu-mobile" onClick={props.mobileCloseModal}>
      {props.menuHTML}.
    </li>
  );
}

export default Navbar;
