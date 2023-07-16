import "./Item.css";
import { useEffect, useState } from "react";
import axios from "axios";

function AccSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [accData, setAccData] = useState([]);
  const [fade, setFade] = useState("");
  const bg = "/img/bg/acc-bg-0.webp";

  // Request the sever
  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/db/acc.json")
      .then((result) => {
        setLoading(true);
        const copy = result.data.filter(
          (data) => data.type == props.id && data.category == "ACCESSORIES"
        );
        setAccData(copy);
      })
      .catch(() => {
        alert("Failed to load.");
      });

    let timer = setTimeout(() => {
      setFade("item-top-bg-fade");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [props.id]);

  // Sort
  const sort = (e) => {
    let copy = [...accData];
    if (e == 0) {
      copy.sort(function (a, b) {
        return a.price - b.price;
      });
      setAccData(copy);
    } else if (e == 1) {
      copy.sort(function (a, b) {
        return b.price - a.price;
      });
      setAccData(copy);
    }
  };

  return (
    <div>
      <div
        className={"item-top-bg " + fade}
        style={{ backgroundImage: `url(${bg})`, backgroundPosition: "top" }}
      ></div>
      <div className="item-title">
        <h2>{props.id}</h2>
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
          accData.map(function (a, index) {
            return (
              <div className="item-box" key={index}>
                <img
                  src={accData[index].img}
                  onMouseEnter={(e) => {
                    e.target.src = `${accData[index].hoverImg}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.src = `${accData[index].img}`;
                  }}
                ></img>
                <h4>{accData[index].name} </h4>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  ({accData[index].color})
                </span>
                <h5>${accData[index].price}</h5>
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

export default AccSection;
