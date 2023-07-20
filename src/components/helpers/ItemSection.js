import "./ItemSection.css";
import CollectionSection from "./CollectionSection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ItemSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [fade, setFade] = useState("");
  const [bg, setBg] = useState("");
  const bgMen = "/img/bg/men-bg-0.webp";
  const bgWomen = "/img/bg/women-bg-2.webp";
  const bgAcc = "/img/bg/acc-bg-0.webp";
  const navigate = useNavigate();

  // Sort
  const sort = (e) => {
    let copy = [...data];
    if (e === 0) {
      copy.sort(function (a, b) {
        return a.price - b.price;
      });
      setData(copy);
    } else if (e === 1) {
      copy.sort(function (a, b) {
        return b.price - a.price;
      });
      setData(copy);
    }
    // console.log("분류중입니다");
  };

  // Store data to the local storage
  const addToLocalStorage = (index) => {
    let wishlist = localStorage.getItem("wishlist");
    let isRedundnat = true;
    wishlist = JSON.parse(wishlist);
    const object = {
      name: data[index].name,
      category: data[index].category,
      type: data[index].type,
      img: data[index].img,
      color: data[index].color,
      price: data[index].price,
      id: data[index].id,
    };

    for (let i = 0; i < wishlist.length; i++) {
      if (
        object.name === wishlist[i].name &&
        object.category === wishlist[i].category &&
        object.color === wishlist[i].color
      ) {
        isRedundnat = false;
        alert("The item is already in your wishlist!");
        break;
      }
    }

    if (isRedundnat) {
      wishlist.push(object);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = "15px";
      setModal(true);
    }
  };

  // Server Request
  useEffect(() => {
    if (props.category === "MEN") {
      axios
        .get(process.env.PUBLIC_URL + "/db/men.json")
        .then((result) => {
          const copy = result.data.filter((data) => data.type === props.type);
          setData(copy);
          setLoading(true);
        })
        .catch(() => {
          alert("Failed to load.");
        });
      //   console.log("데이터베이스 연결 중 입니다");
      setBg(bgMen);
    } else if (props.category === "WOMEN") {
      axios
        .get(process.env.PUBLIC_URL + "/db/women.json")
        .then((result) => {
          const copy = result.data.filter((data) => data.type === props.type);
          setData(copy);
          setLoading(true);
        })
        .catch(() => {
          alert("Failed to load.");
        });
      //   console.log("데이터베이스 연결 중 입니다");
      setBg(bgWomen);
    } else if (props.category === "ACCESSORIES") {
      axios
        .get(process.env.PUBLIC_URL + "/db/acc.json")
        .then((result) => {
          const copy = result.data.filter((data) => data.type === props.type);
          setData(copy);
          setLoading(true);
        })
        .catch(() => {
          alert("Failed to load.");
        });
      //   console.log("데이터베이스 연결 중 입니다");
      setBg(bgAcc);
    }

    let timer = setTimeout(() => {
      setFade("item-top-bg-fade");
      //   console.log("화면전환 효과");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [props.category, props.type]);

  // Check if wishlist is exist in the local storage
  useEffect(() => {
    if (!localStorage.hasOwnProperty("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
    if (!localStorage.hasOwnProperty("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    } 
    document.body.style.overflow = "unset";
  }, []);

  ///////////// Return /////////////
  if (props.category === "COLLECTIONS") {
    return (
      <div>
        <CollectionSection type={props.type} />
      </div>
    );
  } else {
    return (
      <div>
        <div
          className={"item-top-bg " + fade}
          style={{ backgroundImage: `url(${bg})`, backgroundPosition: "top" }}
        ></div>
        <div className="item-title">
          <h2>{props.type}</h2>
          <button
            onClick={() => {
              sort(0);
            }}
            style={{ color: "black" }}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => {
              sort(1);
            }}
            style={{ color: "black" }}
          >
            Price: High to Low
          </button>
        </div>
        <div className="item-container">
          {/* if loading is completed */}
          {isLoading
            ? data.map(function (a, index) {
                return (
                  <div className="item-box" key={index}>
                    <img
                      alt="item"
                      src={data[index].img}
                      onMouseEnter={(e) => {
                        e.target.src = `${data[index].hoverImg}`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.src = `${data[index].img}`;
                      }}
                      onClick={() => {
                        navigate(
                          `/Detail/${props.category}/${props.type}/${data[index].name}/${data[index].id}`
                        );
                      }}
                    ></img>
                    <h4>{data[index].name}</h4>
                    <span style={{ fontSize: "12px", color: "grey" }}>
                      ({data[index].color})
                    </span>
                    <h5 style={{marginBottom: "10px"}}>${data[index].price}</h5>
                    <div className="wishlist-btn-container">
                      <button
                        className="wishListBtn"
                        onClick={() => {
                          addToLocalStorage(index);
                        }}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-heart" size="lg" />
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        {isModal === true ? (
          <>
            <div
              className="modal-container"
              onClick={(e) => {
                const target = document.querySelector(".modal-container");
                if (target === e.target) {
                  setModal(false);
                  document.body.style.overflow = "unset";
                }
              }}
            >
              <div className="modal-bg">
                <div className="modal-title">
                  <h4>Your item was added to wishlist.</h4>
                </div>

                <div className="modal-button-container">
                  <div className="modal-button-flexbox">
                    <button
                      onClick={() => {
                        navigate("/Wishlist");
                        setModal(false);
                        document.body.style.overflow = "unset";
                      }}
                    >
                      VIEW WISHLIST
                    </button>
                  </div>
                  <div className="modal-button-flexbox">
                    <button
                      onClick={() => {
                        setModal(false);
                        document.body.style.overflow = "unset";
                      }}
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>asd</div>
          </>
        ) : null}
      </div>
    );
  }
}

export default ItemSection;
