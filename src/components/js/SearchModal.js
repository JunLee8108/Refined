import "./SearchModal.css";
import { useNavigate } from "react-router-dom";

function SearchModal(props) {
  const navigate = useNavigate();

  const copy = props.data.filter((p) =>
    p.name.replace(" ", "").toLocaleLowerCase().includes(props.searchResult)
  );

  console.log(copy);

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
        <button className="search-more-result">VIEW ALL PRODUCTS</button>
      </div>
    </>
  );
}

export default SearchModal;
