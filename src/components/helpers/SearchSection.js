import "./SearchSection.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function SearchSection(props) {
  const navigate = useNavigate();

  const copy = props.data.filter((p) =>
    p.name
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(props.searchResult.toLocaleLowerCase().replace(" ", ""))
  );

  console.log(copy);

  return (
    <>
      <div className="item-container">
        {props.isDataLoading
          ? copy.map(function (a, index) {
              return (
                <div className="item-box" key={index}>
                  <img
                    alt="item"
                    src={copy[index].img}
                    onClick={() => {
                      props.setSearchModal(false);
                      navigate(
                        `/Detail/${copy[index].category}/${copy[index].type}/${copy[index].name}/${copy[index].id}`
                      );
                    }}
                  ></img>
                  <h4>{copy[index].name}</h4>
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    ({copy[index].color})
                  </span>
                  <h5 style={{ marginBottom: "10px" }}>${copy[index].price}</h5>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default SearchSection;
