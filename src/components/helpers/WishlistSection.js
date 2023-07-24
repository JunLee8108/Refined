import "./WishlistSection.css";
import WishlistSizeModal from "../js/WishlistSizeModal";
import WishlistCompleteModal from "../js/WishlistCompleteModal";
import WishilistAddModal from "../js/WishlistAddModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WishlistSection() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  const [dataName, setDataName] = useState("");
  const [size, setSize] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [fade, setFade] = useState("");
  const [isSizeModal, setSizeModal] = useState(false);
  const [isCompleteModal, setCompleteModal] = useState(false);
  const [isAddModal, setAddModal] = useState(false);
  const [isYes, setYes] = useState(false);
  const [modalFade, setModalFade] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.hasOwnProperty("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    } else {
      setData(JSON.parse(localStorage.getItem("wishlist")));
    }

    if (!localStorage.hasOwnProperty("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }

    let timer = setTimeout(() => {
      setFade("wishlist-container-fade");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setEmpty(true);
      let totalPrice = 0;
      for (let i = 0; i < data.length; i++) {
        totalPrice += parseInt(data[i].price);
      }
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  }, [data]);

  const deleteData = (index) => {
    let copy = [...data];
    copy.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(copy));
    setData(copy);
  };

  const clearBag = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    let copy = [...data];
    copy.length = 0;
    wishlist.length = 0;
    setData(copy);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleCartBtn = (index) => {
    setSizeModal(true);
    document.body.style.overflow = "hidden";
    setDataIndex(index);
  };

  const handleSizeBtn = (dataSize) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    setSize(dataSize);
    setSizeModal(false);
    const object = {
      name: data[dataIndex].name,
      color: data[dataIndex].color,
      totalPrice: parseInt(data[dataIndex].price) * data[dataIndex].count,
      price: parseInt(data[dataIndex].price),
      size: dataSize,
      count: data[dataIndex].count,
      id: data[dataIndex].id,
      img: data[dataIndex].img,
      category: data[dataIndex].category,
      type: data[dataIndex].type,
    };

    if (
      cart.some(
        (x) =>
          x.id === object.id &&
          x.category === object.category &&
          x.size === object.size
      )
    ) {
      setAddModal(true);
    } else {
      cart.push(object);
      localStorage.setItem("cart", JSON.stringify(cart));
      setDataName(data[dataIndex].name);
      deleteData(dataIndex);
      setCompleteModal(true);
    }
  };

  useEffect(() => {
    if (isYes) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        if (
          data[dataIndex].id === cart[i].id &&
          data[dataIndex].category === cart[i].category &&
          size === cart[i].size
        ) {
          cart[i].count += 1;
          cart[i].totalPrice = cart[i].price * cart[i].count;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setDataName(data[dataIndex].name);

      deleteData(dataIndex);
    }
  }, [isYes]);

  useEffect(() => {
    if (isSizeModal) {
      let timer = setTimeout(() => {
        setModalFade("wishlist-modal-fade");
      });

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSizeModal]);

  return (
    <>
      <div className={"wishlist-container " + fade}>
        <div className="wishlist-title">
          <h3>Your Wishlist</h3>
          <table>
            <tbody>
              {isEmpty === true
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
                          {data[index].name} ({data[index].color})
                        </td>
                        <td>${data[index].price}</td>
                        <td>
                          <button
                            className="cartBtn"
                            onClick={() => {
                              handleCartBtn(index);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-cart-shopping"
                              size="lg"
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            className="wishilist-deleteBtn"
                            onClick={() => {
                              deleteData(index);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-delete-left"
                              size="lg"
                              style={{ color: "black" }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
              <tr>
                <td></td>
                <td>Your Total:</td>
                <td>${total}</td>
                <td style={{ width: "0%" }}></td>
                <td style={{ width: "20%" }}>
                  <button
                    onClick={() => {
                      clearBag();
                    }}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-trash"
                      size="lg"
                      style={{ color: "black" }}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isSizeModal ? (
        <WishlistSizeModal
          setSizeModal={setSizeModal}
          handleSizeBtn={handleSizeBtn}
          modalFade={modalFade}
          data={data}
          dataIndex={dataIndex}
        />
      ) : null}
      {isCompleteModal ? (
        <WishlistCompleteModal
          setCompleteModal={setCompleteModal}
          modalFade={modalFade}
          dataName={dataName}
          navigate={navigate}
        />
      ) : null}
      {isAddModal ? (
        <WishilistAddModal
          setAddModal={setAddModal}
          modalFade={modalFade}
          data={data}
          dataIndex={dataIndex}
          size={size}
          setYes={setYes}
          setCompleteModal={setCompleteModal}
        />
      ) : null}
    </>
  );
}

export default WishlistSection;
