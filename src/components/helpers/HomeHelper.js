import "./HomeHelper.css";
import axios from "axios";
import { useEffect, useState } from "react";

function HomeHelper() {
  let [selection, setSelection] = useState([]);
  const [imageHover, setImageHover] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const serverGet = () => {
    axios
      .get("./db/selectionImgs.json")
      .then((result) => {
        setSelection(result.data);
        // Check if load is completed
        setLoading(true);
      })
      .catch(() => {
        alert("Failed");
      });
  };

  useEffect(() => {
    serverGet();
  }, []);

  return (
    <div className="container">
      <div className="home-top-container"></div>
      <div className="home-mid-container">
        <h2>Selections</h2>
        <div className="selection-container">
          {isLoading ? (
            selection.map(function (a, index) {
              return (
                <div className="selection-box" key={index}>
                  <img
                    src={selection[index].img}
                    onMouseEnter={(e) => {
                      e.target.src = `${selection[index].hoverImg}`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.src = `${selection[index].img}`;
                    }}
                  ></img>
                  <h4>
                    {selection[index].name}{" "}
                    <span style={{ fontSize: "12px", color: "grey" }}>
                      ({selection[index].color})
                    </span>
                  </h4>
                  <h5>${selection[index].price}</h5>
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
    </div>
  );
}

export default HomeHelper;
