import "./DetailSection.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DetailSection(props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isAddModal, setAddModal] = useState(false);
  const [isYes, setYes] = useState(false);
  const [indicateItem, setIndicateItem] = useState("");
  const [repeatedObject, setRepeatedObject] = useState({});
  const [data, setData] = useState([]);
  const [fade, setFade] = useState("");
  const [isEmpty, setEmpty] = useState(false);
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
    let cart = localStorage.getItem("cart");
    let isRedundnat = true;
    let object = {};
    cart = JSON.parse(cart);

    object = {
      name: item[0].name,
      color: item[0].color,
      totalPrice: parseInt(item[0].price) * item[0].count,
      price: parseInt(item[0].price),
      size: item[0].size,
      count: item[0].count,
      id: item[0].id,
      img: item[0].img,
      category: item[0].category,
      type: item[0].type,
    };

    for (let i = 0; i < cart.length; i++) {
      if (
        object.name === cart[i].name &&
        object.size === cart[i].size &&
        object.color === cart[i].color &&
        object.category === cart[i].category
      ) {
        isRedundnat = false;
        setAddModal(true);
        setRepeatedObject(object);
        document.body.style.overflow = "hidden";
        break;
      } else {
        isRedundnat = true;
      }
    }

    if (isRedundnat) {
      setIndicateItem(`${object.name} (size ${object.size})`);
      cart.push(object);
      localStorage.setItem("cart", JSON.stringify(cart));
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = "15px";
      setModal(true);
    }
  };

  const handleCopyArray = (index) => {
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
        alert("The Item is alreay in your choice!");
      } else {
        let copy = [...item];
        copy.length = 0;
        copy.push(object);
        setItem(copy);
        setEmpty(true);
      }
    }
  };

  const handleSizeBtn = (index) => {
    handleCopyArray(index);
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
      //   console.log("데이터베이스 연결 중 입니다");
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
      //   console.log("데이터베이스 연결 중 입니다");
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
      //   console.log("데이터베이스 연결 중 입니다");
    }

    let timer = setTimeout(() => {
      setFade("detail-container-effect");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [props.category]);

  useEffect(() => {
    if (isYes) {
      let cart = localStorage.getItem("cart");
      let rem = 0;
      cart = JSON.parse(cart);

      for (let i = 0; i < cart.length; i++) {
        if (
          repeatedObject.name === cart[i].name &&
          repeatedObject.size === cart[i].size &&
          repeatedObject.color === cart[i].color &&
          repeatedObject.category === cart[i].category
        ) {
          cart[i].count += repeatedObject.count;
          rem = i;
        }
      }

      cart[rem].totalPrice = cart[rem].count * cart[rem].price;

      localStorage.setItem("cart", JSON.stringify(cart));
      setYes(false);
    }
  }, [isYes]);

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
                  <h5>Size (inch):</h5>
                  {data[props.id].sizeDC.map(function (a, index) {
                    return (
                      <h5 key={index}>
                        {data[props.id].sizeDC[index].name}:{" "}
                        {data[props.id].sizeDC[index].description}
                      </h5>
                    );
                  })}

                  {/* Size Button */}
                  {data[props.id].size.map(function (a, index) {
                    return (
                      <button
                        className="sizeBtn"
                        key={index}
                        onClick={(e) => {
                          handleSizeBtn(index);
                        }}
                      >
                        {data[props.id].size[index]}
                      </button>
                    );
                  })}
                  <div style={{ marginTop: "25px" }}></div>
                  <div className="border-line"></div>
                  {isEmpty === true ? (
                    <>
                      {/* Item */}
                      <h3>Your Choice:</h3>
                      {item.map(function (a, index) {
                        return (
                          <div key={index}>
                            <h5>
                              {item[index].name} ({item[index].color}) (Size{" "}
                              {item[index].size})
                            </h5>
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

                            <button
                              className="deleteBtn"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => {
                                deleteBtn(index);
                              }}
                            >
                              DELETE
                            </button>

                            <div style={{ marginTop: "25px" }}></div>
                            <div className="border-line"></div>
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
                    </>
                  ) : null}
                </div>

                <div className="detail-flexbox-sizeBtn">
                  {/* Fabric Description */}
                  <h5>Fabric Description:</h5>
                  <h5>{data[props.id].fabricDC}</h5>
                  <div className="border-line"></div>

                  {/* Info */}
                  <h5>Info:</h5>
                  {data[props.id].info.map(function (a, index) {
                    return <h5 key={index}>{data[props.id].info[index]}</h5>;
                  })}
                  <div className="border-line"></div>
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
            <div className="modal-bg">
              <div className="modal-title">
                <h4>{indicateItem + " was added to your bag."}</h4>
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
                      setModal(false);
                      resetYourChoice();
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
            <div className="modal-bg">
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
                    onClick={(e) => {
                      setAddModal(false);
                      setYes(true);
                      resetYourChoice();
                      document.body.style.overflow = "unset";
                    }}
                  >
                    Yes
                  </button>
                </div>
                <div className="modal-button-flexbox">
                  <button
                    onClick={() => {
                      setAddModal(false);
                      resetYourChoice();
                      document.body.style.overflow = "unset";
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>asd</div>
        </>
      ) : null}
    </>
  );
}

export default DetailSection;
