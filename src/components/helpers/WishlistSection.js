import "./WishlistSection.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WishlistSection() {
  const [data, setData] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [fade, setFade] = useState("");
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
    }
  }, [data]);

  const deleteData = (index) => {
    let copy = [...data];
    copy.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(copy));
    setData(copy);
  };

  return (
    <>
      <div className={"wishlist-container " + fade}>
        <div className="wishlist-title">
          <h3>Your Wishlist</h3>
          <table>
            {isEmpty === true
              ? data.map(function (a, index) {
                  return (
                    <tbody key={index}>
                      <tr>
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
                          <button className="cartBtn">
                            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" size="lg" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="wishilist-deleteBtn"
                            onClick={() => {
                              deleteData(index);
                            }}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-delete-left" size="lg" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : null}
          </table>
        </div>
      </div>
    </>
  );
}

export default WishlistSection;
