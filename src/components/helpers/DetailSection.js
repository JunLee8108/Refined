import "./DetailSection.css";
import axios from "axios";
import { useEffect, useState } from "react";

function DetailSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fade, setFade] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [item, setItem] = useState([
    {
      name: "",
      color: "",
      price: 0,
      size: "",
      count: 0,
    },
  ]);

  const handleCopyArray = (index) => {
    const name = `${data[props.id].name}`;
    const size = `${data[props.id].size[index]}`;
    const price = `${data[props.id].price}`;
    const color = `${data[props.id].color}`;
    const object = {
      name: name,
      color: color,
      price: price,
      size: size,
      count: 0,
    };

    if (item.length === 0) {
      let copy = [...item];
      copy.push(object);
      setItem(copy);
      setEmpty(true);
    } else {
      if (item.some((x) => x.name === name && x.size === size)) {
        alert("The Item is alreay in your choice!");
      } else {
        let copy = [...item];
        if (copy[0].price === 0) {
          copy.splice(0, 1);
        }
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
    if (copy[index].count > 0) {
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

  const handleCartBtn = () => {
    if (item.length === 0) {
      alert("Pleas select the option first!");
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
  }, []);

  console.log(isEmpty);

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
                </div>

                <div className="detail-flexbox-sizeBtn">
                  {/* Fabric Description */}
                  <h5>Fabric Description:</h5>
                  <h5>{data[props.id].fabricDC}</h5>
                  <div></div>
                  <div className="border-line"></div>

                  {/* Info */}
                  <h5>Info:</h5>
                  {data[props.id].info.map(function (a, index) {
                    return <h5 key={index}>{data[props.id].info[index]}</h5>;
                  })}
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

                  {isEmpty === true ? (
                    <>
                      {/* Item */}
                      <div style={{ marginTop: "25px" }}></div>
                      <div className="border-line"></div>
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
                          handleCartBtn();
                        }}
                      >
                        ADD TO CART
                      </button>
                    </>
                  ) : null}
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
