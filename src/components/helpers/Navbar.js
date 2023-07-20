import "./Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isHover, setHover] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [handleHover, setHandleHover] = useState("");
  const [navbarModal, setNavbarModal] = useState("");
  const [mobileModal, setMobileModal] = useState("");
  const [menu, setMenu] = useState([]);
  const [menuHTML, setMenuHTML] = useState("");
  const [content, setContent] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContent = (e) => {
    setContent(e);
  };

  // Menu opacity effect
  useEffect(() => {
    if (content.length > 0 && isHover === true) {
      let timer = setTimeout(() => {
        setNavbarModal("show-modal");
      }, 100);
  
      return () => {
        clearTimeout(timer);
        setNavbarModal("");
      };
    }
  }, [isHover, content]);

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

  console.log(content);

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
                  <div key={index}>
                    <li
                      key={index}
                      onClick={(e) => {
                        handleContent(menu[index].catagories);
                        setHandleHover(e.target);
                        setMenuHTML(e.target.innerHTML);
                        setHover(true);
                        if (handleHover === e.target) {
                          setHover(false);
                          setHandleHover("");
                        }
                      }}
                      // onMouseEnter={(e) => {
                      //   handleContent(menu[index].catagories);
                      //   setHandleHover(e.target);
                      //   setMenuHTML(e.target.innerHTML);
                      //   setHover(true);
                      // }}
                    >
                      {menu[index].name}
                    </li>
                  </div>
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
          <li>
            <FontAwesomeIcon icon="fa-solid fa-user-large" size="lg" />
          </li>
          <li
            onClick={() => {
              navigate("/Wishlist");
              setHover(false);
              setHandleHover("");
              setMobile(false);
            }}
          >
            WISHLIST
          </li>
          <li
            onClick={() => {
              navigate("/Cart");
              setHover(false);
              setHandleHover("");
              setMobile(false);
            }}
          >
            BAG
          </li>
        </ul>
      </nav>

      {isHover ? (
        <nav className={"navbar-modal " + navbarModal}>
          <ul className="brand-name display-flex-start">
            <div className="brand-name-box-1 flex-column">
              <div>
                {/* Not visible on laptop */}
                {/* Let users know which button they click (men, women ...) */}
                <MobileIndicator
                  menuHTML={menuHTML}
                  setHover={setHover}
                  setMobile={setMobile}
                  setHandleHover={setHandleHover}
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
                        // navigate(menuHTML + "/" + e.target.innerHTML);
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
            {/* <div className="brand-name-box-2"></div> */}
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
          navigate={navigate}
        />
      ) : null}
      {/********************************************/}
    </div>
  );
}

function MobileMenuBtn(props) {
  // console.log("mobile button 입니다");
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
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </li>
    </div>
  );
}

function MobileIndicator(props) {
  // console.log("mobile indication 이름 나타내줍니다");
  return (
    <li
      style={{
        cursor: "unset",
        border: "none",
        fontWeight: "bold",
        letterSpacing: "1px",
        marginTop: "-10px",
        marginRight: "100px",
      }}
      className="menu-mobile"
      onClick={() => {
        props.setMobile((isMobile) => !isMobile);
        props.setHover(false);
        props.setHandleHover("");
      }}
    >
      {props.menuHTML}.
    </li>
  );
}

function MobileMenu(props) {
  // console.log("mobile Menu 입니다");
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
                  if (props.handleHover === e.target) {
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
        <center>
          <div className="border-line-navbar"></div>
        </center>
        <li>
          <FontAwesomeIcon icon="fa-solid fa-user-large" size="lg" />
        </li>
        <li
          onClick={() => {
            props.navigate("/Wishlist");
            props.setHover(false);
            props.setHandleHover("");
            props.setMobile(false);
          }}
        >
          WISHLIST
        </li>
        <li
          style={{ marginBottom: "15px" }}
          onClick={() => {
            props.navigate("/Cart");
            props.setHover(false);
            props.setHandleHover("");
            props.setMobile(false);
          }}
        >
          BAG
        </li>
      </div>
    </div>
  );
}

export default Navbar;