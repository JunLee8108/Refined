import "./HomeHelper.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllStatus, fetchAll, selectAll } from "../../slices/allSlice";

function HomeHelper() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(false);
  const [scrollSelections, setScrollSelections] = useState(false);

  const dispatch = useDispatch();
  const allStatus = useSelector(getAllStatus);
  const all = useSelector(selectAll);

  useEffect(() => {
    if (allStatus === "idle") {
      dispatch(fetchAll());
    }

    if (allStatus === "loading") {
      console.log("Loading...");
    } else if (allStatus === "succeeded") {
      setLoading(true);
    } else if (allStatus === "failed") {
      setLoading(false);
    }
  }, [allStatus, dispatch]);

  const data = all.filter((x) => x.type === "New Arrival");

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

  useEffect(() => {
    let count = 0;
    const bg1 = document.querySelector(".home-top-bg-1");
    const bg2 = document.querySelector(".home-top-bg-2");
    let timer = setInterval(() => {
      if (count === 0) {
        bg1.style.opacity = 1;
        bg2.style.opacity = 0;
        count += 1;
      } else if (count === 1) {
        bg1.style.opacity = 0;
        bg2.style.opacity = 1;
        count -= 1;
      }
    }, 6000);

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

  return (
    <div className="container">
      <div className="home-top-bg">
        <div className="home-top-bg-1"></div>
        <div className="home-top-bg-2"></div>
      </div>
      {/* <div
        className={
          backgroundImg
            ? "home-top-bg home-top-bg-1"
            : "home-top-bg home-top-bg-2"
        }
      ></div> */}

      <div className="home-mid-container">
        <h2>New Arrival</h2>
        <div className="selection-container">
          {/* if loading is completed */}
          {isLoading
            ? data.map(function (a, index) {
                return (
                  <div
                    // Scroll Event
                    className={`selection-box ${
                      scrollSelections && "selection-box-scroll-event"
                    }`}
                    key={index}
                  >
                    <div className="image-wrapper">
                      <img
                        src={data[index].img}
                        className="image"
                        alt="normal"
                        onClick={() => {
                          navigate(
                            `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                          );
                        }}
                      />
                      <img
                        src={data[index].hoverImg}
                        className="image-hover"
                        alt="hover"
                        onClick={() => {
                          navigate(
                            `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                          );
                        }}
                      />
                    </div>
                    {/* <img
                      alt="item"
                      src={data[index].img}
                      onMouseEnter={(e) => {
                        e.target.src = data[index].hoverImg;
                      }}
                      onMouseLeave={(e) => {
                        e.target.src = data[index].img;
                      }}
                      onClick={() => {
                        navigate(
                          `/Detail/${data[index].category}/${data[index].type}/${data[index].name}/${data[index].id}`
                        );
                      }}
                    ></img> */}
                    <h4>{data[index].name} </h4>
                    <h6>{data[index].category}</h6>
                    <span style={{ fontSize: "12px", color: "grey" }}>
                      ({data[index].color})
                    </span>
                    <h5>${data[index].price}</h5>
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
