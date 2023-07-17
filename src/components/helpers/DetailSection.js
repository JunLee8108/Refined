import "./DetailSection.css";
import axios from "axios";
import { useEffect, useState } from "react";

function DetailSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fade, setFade] = useState("");
  const [item, setItem] = useState([]);
  const [count, setCount] = useState([0]);
  const [isBtn, setBtn] = useState(false);

  const handleCopyArray = (e, index) => {
    let name = `${props.name} (${data[props.id].color}) (Size ${
      data[props.id].size[index]
    })`;
    if (item.some((x) => x == name)) {
      alert("The Item is alreay in your choice!");
    } else {
      let copy = [...item];
      let copy2 = [...count];
      copy.push(name);
      copy2.push(0);
      setItem(copy);
      setCount(copy2);
    }
  };

  const handleSizeBtn = (e, index) => {
    handleCopyArray(e, index);
  };

  const addCount = (e, index) => {
    e.stopPropagation();
    if (count[index] < 5) {
      let copy = [...count];
      copy[index] = copy[index] + 1;
      setCount(copy);
    }
  };

  const minusCount = (e, index) => {
    e.stopPropagation();
    if (count[index] > 0) {
      let copy = [...count];
      copy[index] = copy[index] - 1;
      setCount(copy);
    }
  };

  const deleteBtn = (index) => {
    let copy = [...item];
    let copy2 = [...count];
    copy.splice(index, 1);
    copy2.splice(index, 1);
    setItem(copy);
    setCount(copy2);
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
      console.log("데이터베이스 연결 중 입니다");
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
      console.log("데이터베이스 연결 중 입니다");
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
      console.log("데이터베이스 연결 중 입니다");
    }

    let timer = setTimeout(() => {
      setFade("detail-container-effect");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, []);

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
                        disabled={isBtn}
                        key={index}
                        onClick={(e) => {
                          handleSizeBtn(e, index);
                        }}
                      >
                        {data[props.id].size[index]}
                      </button>
                    );
                  })}

                  {/* Item */}
                  <div style={{ marginTop: "25px" }}></div>
                  <div className="border-line"></div>
                  <h3>Your Choice:</h3>
                  {item.map(function (a, index) {
                    return (
                      <div key={index}>
                        <h5>{item[index]}</h5>
                        <h5>
                          <button
                            className="addMinusBtn"
                            onClick={(e) => {
                              minusCount(e, index);
                            }}
                          >
                            -
                          </button>
                          {count[index]}
                          <button
                            className="addMinusBtn"
                            onClick={(e) => {
                              addCount(e, index);
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
