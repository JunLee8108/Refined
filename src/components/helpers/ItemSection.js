import "./ItemSection.css";
import CollectionSection from "./CollectionSection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllStatus, fetchAll, selectAll } from "../../slices/allSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ItemSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [fade, setFade] = useState("");
  const [bg, setBg] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const allStatus = useSelector(getAllStatus);
  const all = useSelector(selectAll);

  // Sort array (price high to low & price low to high)
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
  };

  // Store wishlist to the local storage
  const addToLocalStorage = (index) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    let isRedundnat = true;

    const DATA_OBJECT = {
      name: data[index].name,
      color: data[index].color,
      price: data[index].price,
      count: 1,
      id: data[index].id,
      img: data[index].img,
      category: data[index].category,
      type: data[index].type,
      size: data[index].size,
    };

    for (let i = 0; i < wishlist.length; i++) {
      if (
        DATA_OBJECT.name === wishlist[i].name &&
        DATA_OBJECT.category === wishlist[i].category &&
        DATA_OBJECT.color === wishlist[i].color
      ) {
        isRedundnat = false;
        alert("The item is already in your wishlist!");
        break;
      }
    }

    if (isRedundnat) {
      wishlist.push(DATA_OBJECT);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = "15px";
      setModal(true);
    }
  };

  useEffect(() => {
    if (allStatus === "idle") {
      dispatch(fetchAll());
    }

    if (allStatus === "succeeded") {
      setLoading(true);
    } else if (allStatus === "failed") {
      setLoading(false);
    }
  }, [allStatus, dispatch]);

  // Server Request
  useEffect(() => {
    switch (props.category) {
      case "MEN":
        const bgMen = "/img/bg/men-bg-0.webp";
        setBg(bgMen);
        break;

      case "WOMEN":
        const bgWomen = "/img/bg/women-bg-2.webp";
        setBg(bgWomen);
        break;

      case "ACCESSORIES":
        const bgAcc = "/img/bg/acc-bg-0.webp";
        setBg(bgAcc);
        break;

      default:
    }

    switch (props.type) {
      case "All":
        const copyAll = all.filter((x) => x.category === props.category);
        setData(copyAll);
        break;

      default:
        const copyElse = all.filter(
          (x) => x.category === props.category && x.type === props.type
        );
        setData(copyElse);
    }
  }, [props.category, props.type, all]);

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setFade("item-top-bg-fade");
  //   }, 100);

  //   return () => {
  //     clearTimeout(timer);
  //     setFade("");
  //   };
  // }, [props.type, props.category]);

  useEffect(() => {
    let timer;
    const onPageLoad = () => {
      timer = setTimeout(() => {
        setFade("item-top-bg-fade");
      }, 200);
    };

    console.log(props.type);

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
    }

    return () => {
      clearTimeout(timer);
      setFade("");
      window.removeEventListener("load", onPageLoad);
    };
  }, [props.type]);

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
          <h2>{`${props.category} - ${props.type}`}</h2>

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
                    <div className="image-wrapper">
                      <img
                        src={data[index].img}
                        className="image"
                        alt="normal"
                        onClick={() => {
                          navigate(
                            `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                          );
                        }}
                      />
                      <img
                        src={data[index].hoverImg}
                        className="image-hover"
                        alt="hover"
                        onClick={() => {
                          navigate(
                            `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                          );
                        }}
                      />
                    </div>

                    {/* <img
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
                          `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                        );
                      }}
                    ></img> */}

                    <h4>{data[index].name}</h4>
                    <span style={{ fontSize: "12px", color: "grey" }}>
                      ({data[index].color})
                    </span>
                    <h5 style={{ marginBottom: "10px" }}>
                      ${data[index].price}
                    </h5>
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
          </>
        ) : null}
      </div>
    );
  }
}

export default ItemSection;
