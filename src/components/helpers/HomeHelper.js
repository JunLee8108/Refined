import "./HomeHelper.css";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HomeBackground = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100vh;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  transition: all 1s;
`;

function HomeHelper() {
  const img1 = "./img/bg-1.webp";
  const img2 = "./img/bg-2.webp";
  const backgroundArray = [img1, img2];
  const [selection, setSelection] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(backgroundArray[0]);
  const [scrollSelections, setScrollSelections] = useState(false);

  ////////////// Server Request //////////////
  const serverGet = () => {
    axios 
      .get(process.env.PUBLIC_URL + "/db/selectionImgs.json")
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

  ////////////// Menu //////////////
  let count = 0;
  useEffect(() => {
    let timer = setInterval(() => {
      if (count === 0) {
        setBackgroundImg(backgroundArray[1]);
        count += 1;
      } else if (count === 1) {
        setBackgroundImg(backgroundArray[0]);
        count -= 1;
      }
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  ////////////// Scroll Event //////////////
  const scrollEvent = () => {
    if (window.scrollY > 580) {
      setScrollSelections(true);
    } else {
      setScrollSelections(false);
    }
    // console.log(scrollHeight);
    // console.log(window.scrollY);
    // console.log(scrollSelections);
  };
  useEffect(() => {
    let timer = setInterval(() => {
      window.addEventListener("scroll", scrollEvent);
    }, 100);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  return (
    <div className="container">
      <HomeBackground bg={backgroundImg} />
      <div className="home-mid-container">
        <h2>Selections</h2>
        <div className="selection-container">
          {/* if loading is completed */}
          {isLoading ? (
            selection.map(function (a, index) {
              return (
                <div
                  // Scroll Event
                  className={`selection-box ${
                    scrollSelections && "selection-box-scroll-event"
                  }`}
                  key={index}
                >
                  <img
                    src={selection[index].img}
                    onMouseEnter={(e) => {
                      e.target.src = `${selection[index].hoverImg}`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.src = `${selection[index].img}`;
                    }}
                  ></img>
                  <h4>{selection[index].name} </h4>
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    ({selection[index].color})
                  </span>
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
