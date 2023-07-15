import { useEffect, useState } from "react";
import "./MenSection.css";
import axios from "axios";
import styled from "styled-components";

const MenBackground = styled.div`
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
`;

function MenSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [menData, setMenData] = useState([]);
  const [fade, setFade] = useState("");

  // Request the sever
  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/db/men.json")
      .then((result) => {
        setLoading(true);
        const copy = result.data.filter((data) => data.type == props.id);
        setMenData(copy);
      })
      .catch(() => {
        alert("Failed to load.");
      });

    let timer = setTimeout(() => {
      setFade("men-top-bg-fade");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [props.id]);

  return (
    <div>
      <div className={"men-top-bg " + fade}></div>
      <div className="men-title">
        <h2>{props.id}</h2>
      </div>
      <div className="men-container">
        {/* if loading is completed */}
        {isLoading ? (
          menData.map(function (a, index) {
            return (
              <div className="men-box" key={index}>
                <img
                  src={menData[index].img}
                  onMouseEnter={(e) => {
                    e.target.src = `${menData[index].hoverImg}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.src = `${menData[index].img}`;
                  }}
                ></img>
                <h4>{menData[index].name} </h4>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  ({menData[index].color})
                </span>
                <h5>${menData[index].price}</h5>
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

export default MenSection;
