import "./Item.css";
import axios from "axios";
import { useEffect, useState } from "react";

function WomenSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [womenData, setWomenData] = useState([]);
  const [fade, setFade] = useState("");
  const bg = "/img/bg/women-bg-0.webp";

  // Request the sever
  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/db/women.json")
      .then((result) => {
        setLoading(true);
        const copy = result.data.filter(
          (data) => data.type == props.id && data.category == "WOMEN"
        );
        setWomenData(copy);
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
    let copy = [...womenData];
    if (e == 0) {
      copy.sort(function (a, b) {
        return a.price - b.price;
      });
      setWomenData(copy);
    } else if (e == 1) {
      copy.sort(function (a, b) {
        return b.price - a.price;
      });
      setWomenData(copy);
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
          womenData.map(function (a, index) {
            return (
              <div className="item-box" key={index}>
                <img
                  src={womenData[index].img}
                  onMouseEnter={(e) => {
                    e.target.src = `${womenData[index].hoverImg}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.src = `${womenData[index].img}`;
                  }}
                ></img>
                <h4>{womenData[index].name} </h4>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  ({womenData[index].color})
                </span>
                <h5>${womenData[index].price}</h5>
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

export default WomenSection;
