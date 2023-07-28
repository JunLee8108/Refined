import "./SearchSection.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSearchData } from "../../store";

function SearchSection(props) {
  const navigate = useNavigate();
  const [fade, setFade] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const state = useSelector((state) => state.searchData);
  const dispatch = useDispatch();

  const sortPrice = (e) => {
    let copy = [...state.data];
    if (e === 0) {
      copy.sort(function (a, b) {
        return a.price - b.price;
      });
      dispatch(changeSearchData(copy));
    } else if (e === 1) {
      copy.sort(function (a, b) {
        return b.price - a.price;
      });
      dispatch(changeSearchData(copy));
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("search-fade");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [state.data]);

  useEffect(() => {
    if (state.data.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [state.data.length]);

  //   if (!localStorage.hasOwnProperty("wishlist")) {
  //     localStorage.setItem("wishlist", JSON.stringify([]));
  //   }
  //   if (!localStorage.hasOwnProperty("cart")) {
  //     localStorage.setItem("cart", JSON.stringify([]));
  //   }

  return (
    <>
      <div className="search-price-container">
        <button
          onClick={() => {
            sortPrice(0);
          }}
          className="search-price-button"
        >
          Price: Low to High
        </button>
        <button
          onClick={() => {
            sortPrice(1);
          }}
          className="search-price-button"
        >
          Price: High to Low
        </button>
      </div>

      {isEmpty ? (
        <div className="search-notice">
          <h2>We're sorry, no products were found for your search.</h2>
        </div>
      ) : (
        <div className={"search-container " + fade}>
          {state.data.map(function (a, index) {
            return (
              <div className="search-box" key={index}>
                <img
                  alt="item"
                  src={state.data[index].img}
                  onMouseEnter={(e) => {
                    e.target.src = `${state.data[index].hoverImg}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.src = `${state.data[index].img}`;
                  }}
                  onClick={() => {
                    navigate(
                      `/Detail/${state.data[index].category}/${state.data[index].type}/${state.data[index].name}/${state.data[index].id}`
                    );
                  }}
                ></img>
                <h4>{state.data[index].name}</h4>
                <h6>{state.data[index].category}</h6>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  ({state.data[index].color})
                </span>
                <h5 style={{ marginBottom: "10px" }}>
                  ${state.data[index].price}
                </h5>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default SearchSection;
