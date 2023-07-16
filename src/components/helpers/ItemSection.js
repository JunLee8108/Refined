import "./ItemSection.css";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function ItemSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fade, setFade] = useState("");
  const [bg, setBg] = useState("");
  const bgMen = "/img/bg/men-bg-0.webp";
  const bgWomen = "/img/bg/women-bg-0.webp";
  const bgAcc = "/img/bg/acc-bg-0.webp";

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
  };

  // Server request
  const serverRequest = useCallback(
    async (url) => {
      axios
        .get(process.env.PUBLIC_URL + url)
        .then((result) => {
          setLoading(true);
          const copy = result.data.filter((data) => data.type === props.type);
          setData(copy);
        })
        .catch(() => {
          alert("Failed to load.");
        });
    },
    [props.type]
  );

  useEffect(() => {
    if (props.category === "MEN") {
      serverRequest("/db/men.json");
      setBg(bgMen);
    } else if (props.category === "WOMEN") {
      serverRequest("/db/women.json");
      setBg(bgWomen);
    } else if (props.category === "ACCESSORIES") {
      serverRequest("/db/acc.json");
      setBg(bgAcc);
    }
    let timer = setTimeout(() => {
      setFade("item-top-bg-fade");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [props.category, serverRequest]);

  return (
    <div>
      <div
        className={"item-top-bg " + fade}
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="item-title">
        <h2>{props.type}</h2>
        <button
          onClick={() => {
            sort(0);
          }}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => {
            sort(1);
          }}
        >
          Price: High to Low
        </button>
      </div>
      <div className="item-container">
        {/* if loading is completed */}
        {isLoading ? (
          data.map(function (a, index) {
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
                ></img>
                <h4>{data[index].name} </h4>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  ({data[index].color})
                </span>
                <h5>${data[index].price}</h5>
              </div>
            );
          })
        ) : (
          <div>
            <h1>loading..</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemSection;
