import "./AboutSection.css";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function AboutSection() {
  const [imgData, setImgData] = useState([]);
  const [textData, setTextData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isScrollIntro1, setScrollIntro1] = useState(false);
  const [isScrollIntro2, setScrollIntro2] = useState(false);
  const [translate, setTranslate] = useState("");

  const scrollEvent = () => {
    let width = document.body.scrollWidth;
    let scrollY = window.scrollY;
    if (width < 767) {
      if (scrollY > 680) {
        setScrollIntro1(true);
      } else {
        setScrollIntro1(false);
      }
      if (scrollY > 1100) {
        setScrollIntro2(true);
      } else {
        setScrollIntro2(false);
      }
    } else if (width < 1921) {
      if (scrollY > 540) {
        setScrollIntro1(true);
      } else {
        setScrollIntro1(false);
      }
      if (scrollY > 1020) {
        setScrollIntro2(true);
      } else {
        setScrollIntro2(false);
      }
    }
    // console.log(document.body.scrollWidth);
    // console.log(window.scrollY);
  };

  useEffect(() => {
    axios
      .get(process.env.PUBLIC_URL + "/db/about.json")
      .then((result) => {
        const copy = result.data.filter((data) => data.type === "img");
        const copy2 = result.data.filter((data) => data.type === "text");
        setImgData(copy);
        setTextData(copy2);
        setLoading(true);
      })
      .catch(() => {
        alert("Failed to load.");
      });
  }, []);

  useEffect(() => {
    if (imgData.length !== 0 && isLoading) {
      let timer = setTimeout(() => {
        setTranslate("about-top-img-flexbox-translate");
      }, 200);

      return () => {
        clearTimeout(timer);
        setTranslate("");
      };
    }
  }, [imgData]);

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
    <>
      {isLoading ? (
        <>
          <div className="about-top-img-container">
            <div className={"about-top about-top-img-flexbox1 " + translate}>
              <img src={imgData[0].img} alt=""></img>
            </div>
            <div className="about-top-img-flexbox about-top-img-flexbox2"></div>
            <div className={"about-top about-top-img-flexbox3 " + translate}>
              <img src={imgData[1].img} alt=""></img>
            </div>

            <div className={"about-top about-top-img-flexbox1 " + translate}>
              <img src={imgData[2].img} alt=""></img>
            </div>
            <div className="about-top-img-flexbox about-top-img-flexbox2"></div>
            <div className={"about-top about-top-img-flexbox3 " + translate}>
              <img src={imgData[3].img} alt=""></img>
            </div>
          </div>

          <div className="about-mid-container">
            <div
              className={`about-mid-introduction ${
                isScrollIntro1 && "about-mid-introduction-scroll"
              }`}
            >
              <h3>{textData[0].title} </h3>
              <p>{textData[0].description}</p>
            </div>
          </div>

          <div className="about-mid-container" style={{ background: "white" }}>
            <div
              className={`about-mid-introduction ${
                isScrollIntro2 && "about-mid-introduction-scroll"
              }`}
            >
              <h3>{textData[1].title}</h3>
              <p>{textData[1].description}</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default AboutSection;
