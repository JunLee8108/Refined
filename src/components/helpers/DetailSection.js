import "./DetailSection.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DetailSection(props) {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isAddModal, setAddModal] = useState(false);
  const [isYes, setYes] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [repeatedObject, setRepeatedObject] = useState({});

  const [fade, setFade] = useState("");
  const [modalFade, setModalFade] = useState("");
  const [addModalFade, setAddModalFade] = useState("");
  const [choiceFade, setChoiceFade] = useState("");
  const [handleChoiceFade, setHandleChoiceFade] = useState(false);

  const [isEmpty, setEmpty] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState([
    {
      name: "",
      color: "",
      price: 0,
      size: "",
      count: 1,
    },
  ]);

  const resetYourChoice = () => {
    setEmpty(false);
    setItem([{ name: "", color: "", price: 0, size: "", count: 1 }]);
  };

  const addToLocalStorage = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let isRedundnat = true;
    let object = {};

    object = {
      name: item[0].name,
      color: item[0].color,
      totalPrice: parseInt(item[0].price) * item[0].count,
      price: parseInt(item[0].price),
      size: item[0].size,
      count: item[0].count,
      id: parseInt(item[0].id),
      img: item[0].img,
      category: item[0].category,
      type: item[0].type,
    };

    if (
      cart.some(
        (x) =>
          x.name === object.name &&
          x.size === object.size &&
          x.color === object.color &&
          x.category === object.category
      )
    ) {
      isRedundnat = false;
      setAddModal(true);
      setRepeatedObject(object);
      document.body.style.overflow = "hidden";
    } else {
      isRedundnat = true;
    }

    if (isRedundnat) {
      setDisplayName(`${object.name} (size ${object.size})`);
      cart.push(object);
      localStorage.setItem("cart", JSON.stringify(cart));
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = "15px";
      setModal(true);
    }
  };

  const handleSizeBtn = (index) => {
    const name = `${data[props.id].name}`;
    const size = `${data[props.id].size[index]}`;
    const price = `${data[props.id].price}`;
    const color = `${data[props.id].color}`;
    const id = `${data[props.id].id}`;
    const img = `${data[props.id].img}`;
    const category = `${data[props.id].category}`;
    const type = `${data[props.id].type}`;

    const object = {
      name: name,
      color: color,
      price: price,
      size: size,
      count: 1,
      id: id,
      img: img,
      category: category,
      type: type,
    };

    if (item.length === 0) {
      let copy = [...item];
      copy.length = 0;
      copy.push(object);
      setItem(copy);
      setEmpty(true);
    } else {
      if (item.some((x) => x.name === name && x.size === size)) {
        alert("The Item is already in your choice!");
      } else {
        let copy = [...item];
        copy.length = 0;
        copy.push(object);
        setItem(copy);
        setEmpty(true);
        setHandleChoiceFade((handleChoiceFade) => !handleChoiceFade);
      }
    }
  };

  const addCount = (index) => {
    let copy = [...item];
    if (copy[index].count < 5) {
      copy[index].count += 1;
      setItem(copy);
    } else {
      alert("You have reached the maximum quantity!");
    }
  };

  const minusCount = (index) => {
    let copy = [...item];
    if (copy[index].count > 1) {
      copy[index].count -= 1;
      setItem(copy);
    }
  };

  const deleteBtn = (index) => {
    let copy = [...item];
    copy.splice(index, 1);
    setItem(copy);
    if (item.length === 1) {
      setEmpty(false);
    }
  };

  useEffect(() => {
    if (props.category === "MEN") {
      axios
        .get(process.env.PUBLIC_URL + "/db/men.json")
        .then((result) => {
          setData(result.data);
          setLoading(true);
        })
        .catch(() => {
          alert("Failed to load.");
        });
    } else if (props.category === "WOMEN") {
      axios
        .get(process.env.PUBLIC_URL + "/db/women.json")
        .then((result) => {
          setData(result.data);
          setLoading(true);
        })
        .catch(() => {
          alert("Failed to load.");
        });
    } else if (props.category === "ACCESSORIES") {
      axios
        .get(process.env.PUBLIC_URL + "/db/acc.json")
        .then((result) => {
          setData(result.data);
          setLoading(true);
        })
        .catch(() => {
          alert("Failed to load.");
        });
    }
  }, [props.category]);

  useEffect(() => {
    if (data.length !== 0) {
      let timer = setTimeout(() => {
        setFade("detail-container-effect");
      }, 200);

      return () => {
        clearTimeout(timer);
        setFade("");
      };
    }
  }, [data]);

  useEffect(() => {
    if (isYes) {
      let cart = localStorage.getItem("cart");
      let index = 0;
      cart = JSON.parse(cart);

      for (let i = 0; i < cart.length; i++) {
        if (
          repeatedObject.name === cart[i].name &&
          repeatedObject.size === cart[i].size &&
          repeatedObject.color === cart[i].color &&
          repeatedObject.category === cart[i].category
        ) {
          cart[i].count += repeatedObject.count;
          index = i;
        }
      }

      cart[index].totalPrice = cart[index].count * cart[index].price;

      localStorage.setItem("cart", JSON.stringify(cart));
      setYes(false);
    }
  }, [isYes]);

  useEffect(() => {
    if (isModal) {
      let timer = setTimeout(() => {
        setModalFade("modal-fade");
      }, 100);

      return () => {
        clearTimeout(timer);
        setModalFade("");
      };
    }
  }, [isModal]);

  useEffect(() => {
    if (isAddModal) {
      let timer = setTimeout(() => {
        setAddModalFade("modal-fade");
      }, 100);

      return () => {
        clearTimeout(timer);
        setAddModalFade("");
      };
    }
  }, [isAddModal]);

  useEffect(() => {
    if (isEmpty) {
      let timer = setTimeout(() => {
        setChoiceFade("detail-your-choice-fade");
      }, 100);

      return () => {
        clearTimeout(timer);
        setChoiceFade("");
      };
    }
  }, [isEmpty, handleChoiceFade]);

  return (
    <>
      {isLoading ? (
        <>
          <div className={"detail-container " + fade}>
            <div className="detail-box">
              <div className="detail-flexbox">
                {/* Image */}
                <img src={data[props.id].img} alt="clothes"></img>
              </div>

              <div className="detail-flexbox">
                <div className="detail-flexbox-title">
                  {/* Name, Price and Color */}
                  <h4>
                    {props.name}{" "}
                    <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                      ({data[props.id].color})
                    </span>
                  </h4>

                  {/* Price */}
                  <h5>${data[props.id].price}</h5>
                  <div className="border-line"></div>

                  {/* Size Description */}
                  <h4>Size (inch):</h4>
                  {data[props.id].sizeDC.map(function (a, index) {
                    return (
                      <h5 key={index} style={{ fontWeight: "normal" }}>
                        {data[props.id].sizeDC[index].name}:{" "}
                        {data[props.id].sizeDC[index].description}
                      </h5>
                    );
                  })}

                  {/* Size Button */}
                  <div className="detail-sizeBtn-container">
                    {data[props.id].size.map(function (a, index) {
                      return (
                        <button
                          className="sizeBtn"
                          key={index}
                          onClick={() => {
                            handleSizeBtn(index);
                          }}
                        >
                          {data[props.id].size[index]}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: "25px" }}></div>
                  <div className="border-line"></div>

                  {/* Item */}
                  <div className={"detail-your-choice " + choiceFade}>
                    {isEmpty === true ? (
                      <>
                        <h3>Your Choice:</h3>
                        {item.map(function (a, index) {
                          return (
                            <div key={index}>
                              <h5>
                                <div className="detail-product-name-container">
                                  <div className="detail-product-name-flexbox">
                                    {item[index].name}{" "}
                                    <span style={{ fontSize: "11px" }}>
                                      ({item[index].color}){" "}
                                    </span>{" "}
                                    <span style={{ fontSize: "11px" }}>
                                      (Size {item[index].size})
                                    </span>
                                  </div>
                                  <div className="detail-product-name-flexbox">
                                    <button
                                      className="deleteBtn"
                                      onClick={() => {
                                        deleteBtn(index);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon="fa-solid fa-delete-left"
                                        size="xl"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </h5>

                              <div className="detail-quantity-container">
                                <h5>
                                  <button
                                    className="addMinusBtn"
                                    onClick={() => {
                                      minusCount(index);
                                    }}
                                  >
                                    -
                                  </button>
                                  {item[index].count}
                                  <button
                                    className="addMinusBtn"
                                    onClick={() => {
                                      addCount(index);
                                    }}
                                  >
                                    +
                                  </button>
                                </h5>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          className="addToCartBtn"
                          onClick={() => {
                            addToLocalStorage();
                          }}
                        >
                          ADD TO BAG
                        </button>
                        <div style={{ marginTop: "25px" }}></div>
                        <div className="border-line"></div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="detail-flexbox-sizeBtn">
                  {/* Fabric Description */}
                  <h4>Fabric Description:</h4>
                  <h5 style={{ fontWeight: "normal" }}>
                    {data[props.id].fabricDC}
                  </h5>

                  <div className="border-line"></div>

                  {/* Info */}
                  <h4>Info:</h4>
                  {data[props.id].info.map(function (a, index) {
                    return (
                      <h5
                        key={index}
                        style={{ fontWeight: "500", color: "#353535" }}
                      >
                        {data[props.id].info[index]}
                      </h5>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

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
            <div className={"detail-modal-bg " + modalFade}>
              <div className="modal-title">
                <h4>{displayName + " was added to your bag."}</h4>
              </div>

              <div style={{ marginBottom: "30px" }}></div>

              <div className="modal-button-container">
                <div className="modal-button-flexbox">
                  <button
                    onClick={() => {
                      navigate("/Cart");
                      setModal(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    VIEW BAG
                  </button>
                </div>
                <div className="modal-button-flexbox">
                  <button
                    onClick={() => {
                      resetYourChoice();
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
      {isAddModal === true ? (
        <>
          <div
            className="modal-container"
            onClick={(e) => {
              const target = document.querySelector(".modal-container");
              if (target === e.target) {
                setAddModal(false);
                document.body.style.overflow = "unset";
              }
            }}
          >
            <div className={"detail-modal-bg " + addModalFade}>
              <div className="modal-title">
                <h4>
                  {repeatedObject.name +
                    "(size " +
                    repeatedObject.size +
                    ") is already in your bag."}
                </h4>
                <h4>Would you like to add more?</h4>
              </div>

              <div className="modal-button-container">
                <div className="modal-button-flexbox">
                  <button
                    className="yesBtn"
                    onClick={() => {
                      resetYourChoice();
                      setAddModal(false);
                      setYes(true);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    Yes
                  </button>
                </div>
                <div className="modal-button-flexbox">
                  <button
                    onClick={() => {
                      resetYourChoice();
                      setAddModal(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default DetailSection;
