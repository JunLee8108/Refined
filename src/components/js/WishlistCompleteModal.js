import "./WishlistModal.css";

function WishlistCompleteModal(props) {
  return (
    <>
      <div
        className="wishlist-modal-container"
        onClick={(e) => {
          const target = document.querySelector(".wishlist-modal-container");
          if (target === e.target) {
            props.setCompleteModal(false);
            document.body.style.overflow = "unset";
          }
        }}
      >
        <div className={"wishlist-modal-bg " + props.modalFade}>
          <div className="wishlist-modal-title">
            <h4>{props.dataName} was added to your cart.</h4>
          </div>

          <div className="wishlist-modal-button-container">
            <div className="wishlist-modal-button-flexbox">
              <button
                onClick={() => {
                  props.navigate("/Cart");
                  props.setCompleteModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                VIEW CART
              </button>
            </div>
            <div className="wishlist-modal-button-flexbox">
              <button
                onClick={() => {
                  props.setCompleteModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistCompleteModal;
