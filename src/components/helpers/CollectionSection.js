import "./CollectionSection.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CollectionSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/db/collection.json")
      .then((result) => {
        const copy = result.data.filter((data) => data.season === props.type);
        setData(copy);
        setLoading(true);
      })
      .catch(() => {
        alert("Failed to load.");
      });
  }, [props.type]);

  useEffect(() => {
    if (data.length !== 0 && data[0].season === props.type) {
      let timer = setTimeout(() => {
        setFade("collection-fade");
      }, 100);

      return () => {
        clearTimeout(timer);
        setFade("");
      };
    }
  }, [data]);

  useEffect(() => {
    if (!localStorage.hasOwnProperty("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
    if (!localStorage.hasOwnProperty("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      {isLoading === true ? (
        <div className={"collection-container " + fade}>
          <div className="collection-title">
            <h3>{props.type}</h3>
          </div>

          <div className="collection-img-container">
            {data.map(function (a, index) {
              return (
                <div className="collection-img-box" key={index}>
                  <img src={data[index].img} alt="lookbook"></img>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CollectionSection;
