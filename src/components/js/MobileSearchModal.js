import "./MobileSearchModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MobileSearchModal(props) {
  const emptyInput = (e) => {
    e.target.value = "";
  };

  return (
    <>
      <div className="mobile-search-modal-bg">
        <div className="mobile-search-modal-content">
          <div className="mobile-search-modal-title">
            <input
              type="text"
              placeholder="search.."
              id="search"
              onBlur={(e) => {
                emptyInput(e);
              }}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileSearchModal;
