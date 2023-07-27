import "./HomeHelper.css";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMenStatus,
  fetchMen,
  selectMen,
  getMenError,
} from "../../slices/menSlice";

// const HomeBackground = styled.div`
//   background-image: url(${(props) => props.bg});
//   height: 100vh;
//   background-repeat: no-repeat;
//   background-position: top;
//   background-size: cover;
//   transition: all 1s;
// `;

function HomeHelper() {
  const img1 = "./img/bg/bg-1.webp";
  const img2 = "./img/bg/bg-2.webp";
  const backgroundArray = [img1, img2];
  const navigate = useNavigate();
  const [selection, setSelection] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(false);
  const [scrollSelections, setScrollSelections] = useState(false);

  const dispatch = useDispatch();
  const menStatus = useSelector(getMenStatus);
  const men = useSelector(selectMen);
  const error = useSelector(getMenError);

  useEffect(() => {
    if (menStatus === "idle") {
      dispatch(fetchMen());
    }

    if (menStatus === "loading") {
      setSelection("h2>Loading...</h2>");
    } else if (menStatus === "succeeded") {
      setLoading(true);
      const copy = men.filter((data) => data.type === "New Arrival");
      setSelection(copy);
    } else if (menStatus === "failed") {
      setLoading(false);
    }
  }, [menStatus, dispatch]);

  // let contentToDisplay = "";

  // ////////////// Server Request //////////////
  // useEffect(() => {
  //   axios
  //     .get(process.env.PUBLIC_URL + "/db/selectionImgs.json")
  //     .then((result) => {
  //       setSelection(result.data);
  //       // Check if load is completed
  //       setLoading(true);
  //     })
  //     .catch(() => {
  //       alert("Failed");
  //     });
  // }, []);

  ////////////// Background Change //////////////
  // useEffect(() => {
  //   if (backgroundImg !== "") {
  //     let count = 0;
  //     let timer = setInterval(() => {
  //       if (count === 0) {
  //         setBackgroundImg(backgroundArray[1]);
  //         count += 1;
  //       } else if (count === 1) {
  //         setBackgroundImg(backgroundArray[0]);
  //         count -= 1;
  //       }
  //     }, 5000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [backgroundImg]);

  useEffect(() => {
    let count = 0;
    let timer = setInterval(() => {
      if (count === 0) {
        setBackgroundImg(true);
        count += 1;
      } else if (count === 1) {
        setBackgroundImg(false);
        count -= 1;
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [backgroundImg]);

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

    document.body.style.overflow = "unset";

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.hasOwnProperty("wishlist")) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
    if (!localStorage.hasOwnProperty("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  // console.log(contentToDisplay.men);
  // console.log(men);

  return (
    <div className="container">
      {/* <HomeBackground bg={backgroundImg} /> */}
      <div
        className={
          backgroundImg
            ? "home-top-bg home-top-bg-1"
            : "home-top-bg home-top-bg-2"
        }
      ></div>
      <div className="home-mid-container">
        <h2>New Arrival</h2>
        <div className="selection-container">
          {/* if loading is completed */}
          {isLoading
            ? selection.map(function (a, index) {
                return (
                  <div
                    // Scroll Event
                    className={`selection-box ${
                      scrollSelections && "selection-box-scroll-event"
                    }`}
                    key={index}
                  >
                    <img
                      alt="item"
                      src={selection[index].img}
                      onMouseEnter={(e) => {
                        e.target.src = selection[index].hoverImg;
                      }}
                      onMouseLeave={(e) => {
                        e.target.src = selection[index].img;
                      }}
                      onClick={() => {
                        navigate(
                          `/Detail/${selection[index].category}/${selection[index].type}/${selection[index].name}/${selection[index].id}`
                        );
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
            : null}
        </div>
      </div>
    </div>
  );
}

export default HomeHelper;
