import "./Navbar.css";
import MobileMenuBtn from "../js/MobileMenuBtn";
import MobileIndicator from "../js/MobileIndicator";
import SearchModal from "../js/SearchModal";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);
  const [navbarModal, setNavbarModal] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isSearchModal, setSearchModal] = useState(false);
  const [searchResult, setSearchResult] = useState(true);
  const [inputTarget, setInputTarget] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [contentName, setContentName] = useState("");
  const [mobileModal, setMobileModal] = useState("");
  const [menu, setMenu] = useState([]);
  const [content, setContent] = useState([]);
  const [icons, setIcon] = useState(faBars);
  const [data, setData] = useState([]);
  const [copyName, setCopyName] = useState("");
  const isMounted = useRef(false);

  // Control contents modal
  const controlContentsModal = (e, category) => {
    setContent(category);
    setContentName(e.target);
    setCopyName(e.target.innerHTML);

    setNavbarModal(true);
    setMobile(false);
    setMobileModal((mobileModal) => !mobileModal);

    cleanInput();

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

    activeNavbar(e);
  };

  // Navigate contents modal
  const navigateContents = (e) => {
    navigate("Item/" + contentName.innerHTML + "/" + e.target.innerHTML);
    setNavbarModal(false);
    setContentName("");
    inactiveNavbar();
    cleanInput();
  };

  // Close contents modal
  const closeContentsModal = (url) => {
    navigate(url);
    setNavbarModal(false);
    setContentName("");
    setMobile(false);
    inactiveNavbar();
    cleanInput();
  };

  // Close mobile modal
  const closeMobileModal = () => {
    setContentName("");
    setMobileModal((mobileModal) => !mobileModal);
    setNavbarModal(false);
    setModal(false);
  };

  // Active navbar
  const activeNavbar = (e) => {
    e.target.style.borderBottom = "1px solid black";
    if (contentName.length !== 0) {
      contentName.style.borderBottom = "1px solid transparent";
    }
  };

  // Inactive navbar
  const inactiveNavbar = () => {
    let navbar = document.querySelectorAll("#navbarMenu");
    for (let i = 0; i < navbar.length; i++) {
      navbar[i].style.borderBottom = "1px solid transparent";
    }
  };

  const controlSearchModal = (e) => {
    setNavbarModal(false);
    inactiveNavbar();
    setSearchModal(true);
    setSearchResult(e.target.value.replace(" ", "").toLowerCase());
    if (e.target.value.length === 0) {
      setSearchModal(false);
    }
  };

  const cleanInput = () => {
    if (inputTarget !== "") {
      setSearchModal(false);
      inputTarget.value = "";
    }
  };

  // Icon change depending on the menu
  useEffect(() => {
    if (mobileModal === true) {
      setIcon("fa-solid fa-square-xmark");
    } else if (navbarModal === true) {
      setIcon("fa-solid fa-left-long");
    } else {
      setIcon(faBars);
    }
  }, [mobileModal, navbarModal]);

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

    axios
      .get(process.env.PUBLIC_URL + "/db/all.json")
      .then((result) => {
        setData(result.data);
      })
      .catch(() => {
        alert("Failed to load.");
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

  // console.log(copyName);

  return (
    <div className="navbar-container">
      <nav>
        <ul className="brand-name display-flex-start">
          <div className="brand-name-box-1">
            <h1
              onClick={() => {
                closeContentsModal("/");
                setMobileModal(false);
              }}
            >
              Refined
            </h1>
            <h4>Seoul</h4>

            {/* Not visible on laptop (Mobile Menu Button) */}
            <MobileMenuBtn closeMobileModal={closeMobileModal} icons={icons} />
            {/**********************************************/}
          </div>

          <div className="brand-name-box-2">
            {isLoading
              ? menu.map(function (a, index) {
                  return (
                    <div key={index}>
                      <li
                        id="navbarMenu"
                        onClick={(e) => {
                          controlContentsModal(e, menu[index].categories);
                        }}
                      >
                        {menu[index].name}
                      </li>
                    </div>
                  );
                })
              : null}
            <li
              onClick={(e) => {
                closeContentsModal("/About");
              }}
            >
              ABOUT US
            </li>
            <div className="nav-search">
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                style={{ marginRight: "10px" }}
                size="sm"
              />
              <input
                onChange={(e) => {
                  controlSearchModal(e);
                  setInputTarget(e.target);
                }}
                type="text"
                placeholder="Search.."
              />
            </div>
          </div>
        </ul>

        <ul className="nav-menu display-flex-start">
          <li>
            <FontAwesomeIcon icon="fa-solid fa-user-large" size="lg" />
          </li>
          <li
            onClick={() => {
              closeContentsModal("/Wishlist");
            }}
          >
            WISHLIST
          </li>
          <li
            onClick={() => {
              closeContentsModal("/Cart");
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
            <div className="navbar-content-box">
              <div>
                {/* Not visible on laptop. Let users know which button they click (men, women ...) */}
                <MobileIndicator
                  contentName={contentName}
                  closeMobileModal={closeMobileModal}
                />
                {/***********************************************************/}

                <center>
                  <div
                    className="border-line-navbar"
                    style={{ width: "78%" }}
                  ></div>
                </center>

                {/* <div className="navbar-indicator">
                  <li className="navbar-content-list-name">
                    {contentName.innerHTML}
                  </li>
                </div> */}

                <li className="navbar-content-list-name">{copyName}</li>

                {content.map(function (a, index) {
                  return (
                    <li
                      key={index}
                      onClick={(e) => {
                        navigateContents(e);
                      }}
                      className="navbar-content-list"
                    >
                      {content[index]}
                    </li>
                  );
                })}
              </div>
            </div>
          </ul>
          <ul className="nav-menu display-flex-start"></ul>
        </nav>
      ) : null}

      {/* Mobile navbar */}
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
                          controlContentsModal(e, menu[index].categories);
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
                closeContentsModal("/About");
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
                closeContentsModal("/Wishlist");
              }}
            >
              WISHLIST
            </li>
            <li
              className="mobile-navbar-bag"
              onClick={() => {
                closeContentsModal("/Cart");
              }}
            >
              BAG
            </li>
            {/* <div className="nav-search">
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                style={{ marginRight: "10px" }}
              />
              <input
                onChange={(e) => {
                  controlSearchModal(e);
                  setInputTarget(e.target);
                }}
                type="text"
                placeholder="Search.."
              />
            </div> */}
          </div>
        ) : null}
      </nav>

      {isSearchModal === true ? (
        <SearchModal
          searchResult={searchResult}
          setSearchModal={setSearchModal}
          cleanInput={cleanInput}
          data={data}
          inputTarget={inputTarget}
        />
      ) : null}
    </div>
  );
}

export default Navbar;
