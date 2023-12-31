import "./SearchModal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSearchData } from "../../store";

function SearchModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let copy = props.data.filter((p) =>
    p.name.replace(" ", "").toLocaleLowerCase().includes(props.searchResult)
  );

  const viewAllProducts = () => {
    props.cleanInput();
    dispatch(changeSearchData(copy));
    setTimeout(() => {
      navigate("/Search");
    }, 100);
  };

  // console.log(copy);

  return (
    <>
      <div
        className="search-black-container"
        onClick={(e) => {
          const target = document.querySelector(".search-black-container");
          if (target === e.target) {
            props.cleanInput();
          }
        }}
      >
        <div className="search-bg">
          <div className="search-flex-container">
            {copy.map(function (a, index) {
              return (
                <div className="search-flexbox" key={index}>
                  {index < 3 ? (
                    <>
                      <img
                        alt=""
                        src={copy[index].img}
                        onClick={() => {
                          navigate(
                            `/Detail/${copy[index].category}/${copy[index].type}/${copy[index].name}/${copy[index].id}`
                          );
                          props.cleanInput();
                          props.setSearchModal(false);
                        }}
                      ></img>
                      <h5>{copy[index].name}</h5>
                    </>
                  ) : null}
                </div>
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
      </div>
    </>
  );
}

export default SearchModal;
