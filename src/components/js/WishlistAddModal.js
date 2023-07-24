import "./WishlistModal.css";

function WishilistAddModal(props) {
  return (
    <>
      <div
        className="wishlist-modal-container"
        onClick={(e) => {
          const target = document.querySelector(".wishlist-modal-container");
          if (target === e.target) {
            props.setAddModal(false);
            document.body.style.overflow = "unset";
          }
        }}
      >
        <div className={"wishlist-modal-bg " + props.modalFade}>
          <div className="wishlist-modal-title">
            <h4>
              {props.data[props.dataIndex].name}{" "}
              <span style={{ fontSize: "12px" }}>
                ({props.data[props.dataIndex].color}) ({props.size})
              </span>{" "}
              is already in your cart.
            </h4>
            <h4>Would you like to add more?</h4>
          </div>

          <div className="wishlist-modal-button-container">
            <div className="wishlist-modal-button-flexbox">
              <button
                onClick={() => {
                  props.setYes(true);
                  props.setAddModal(false);
                  props.setCompleteModal(true);
                }}
              >
                Yes
              </button>
            </div>
            <div className="wishlist-modal-button-flexbox">
              <button
                onClick={() => {
                  props.setAddModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishilistAddModal;
