import "./CartSection.css";
import CartModal from "../js/CartModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartSection() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [fade, setFade] = useState("");
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if localstorage is empty
    if (!localStorage.hasOwnProperty("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
    if (!localStorage.hasOwnProperty("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      setData(JSON.parse(localStorage.getItem("cart")));
    }

    // Transition Effect
    let timer = setTimeout(() => {
      setFade("cart-container-fade");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setLoading(true);
      let totalPrice = 0;
      for (let i = 0; i < data.length; i++) {
        totalPrice += parseInt(data[i].totalPrice);
      }
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  }, [data]);

  const deleteItem = (index) => {
    let copy = [...data];
    copy.splice(index, 1);
    setData(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const clearBag = () => {
    let copy = [...data];
    copy.length = 0;
    setData(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const handleCount = (index, e) => {
    let copy = [...data];
    // Minus
    if (e === 0) {
      if (copy[index].count > 1) {
        copy[index].count -= 1;
        copy[index].totalPrice = copy[index].price * copy[index].count;
        setData(copy);
      }
    }
    // Plus
    else {
      copy[index].count += 1;
      copy[index].totalPrice = copy[index].price * copy[index].count;
      setData(copy);
    }
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const controlCartModal = () => {
    if (data.length === 0) {
      setModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <div className={"cart-container " + fade}>
        <div className="cart-title">
          <h3>Your bag</h3>
          <table>
            <tbody>
              {isLoading
                ? data.map(function (a, index) {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={data[index].img}
                            onClick={() => {
                              navigate(
                                `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                              );
                            }}
                            alt="clothes"
                          ></img>
                        </td>
                        <td>
                          {data[index].name}{" "}
                          <div className="cart-color">
                            ({data[index].color})
                          </div>{" "}
                          <div className="cart-size">
                            (Size {data[index].size})
                          </div>
                        </td>
                        <td>
                          <button
                            className="cart-minusBtn"
                            onClick={() => {
                              handleCount(index, 0);
                            }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-minus" />
                          </button>{" "}
                          {data[index].count}{" "}
                          <button
                            className="cart-plusBtn"
                            onClick={() => {
                              handleCount(index, 1);
                            }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                          </button>
                        </td>
                        <td>${data[index].totalPrice}</td>

                        <td>
                          <button
                            className="cart-deleteBtn"
                            onClick={() => {
                              deleteItem(index);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-delete-left"
                              size="lg"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
              <tr>
                <td></td>
                <td style={{ width: "0%" }}></td>
                <td>Your Total:</td>
                <td>${total}</td>
                <td style={{ width: "20%" }}>
                  <button
                    onClick={() => {
                      clearBag();
                    }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" size="lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="cart-checkout-container">
            <button
              className="cart-checkout-btn"
              onClick={() => {
                controlCartModal();
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {isModal === true ? (
        <>
          <CartModal btn1="CLOSE" setModal={setModal} />
        </>
      ) : null}
    </>
  );
}

export default CartSection;
