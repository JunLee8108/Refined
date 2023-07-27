import "./SearchModal.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchData } from "../../store";

function SearchModal(props) {
  const navigate = useNavigate();
  const state = useSelector((state) => state.searchData);
  const dispatch = useDispatch();

  let copy = props.data.filter((p) =>
    p.name.replace(" ", "").toLocaleLowerCase().includes(props.searchResult)
  );

  if (props.inputTarget.value === "") {
    let copy = "";
  }

  const viewAllProducts = () => {
    props.cleanInput();
    dispatch(changeSearchData(copy));
    setTimeout(() => {
      navigate("/Search");
    }, 100);
  };

  return (
    <>
      <div className="search-bg">
        <div className="search-flex-container">
          {copy.map(function (a, index) {
            return (
              <>
                {index < 3 ? (
                  <div className="search-flexbox" key={index}>
                    <img
                      src={copy[index].img}
                      onClick={() => {
                        navigate(
                          `/Detail/${copy[index].category}/${copy[index].type}/${copy[index].name}/${copy[index].id}`
                        );
                        props.setSearchModal(false);
                      }}
                    ></img>
                    <h5>{copy[index].name}</h5>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
        <button
          className="search-more-result"
          onClick={() => {
            viewAllProducts();
          }}
        >
          VIEW ALL PRODUCTS
        </button>
      </div>
    </>
  );
}

export default SearchModal;
