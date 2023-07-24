import "./CartModal.css";

function CartModal(props) {
  return (
    <>
      <div
        className="cart-modal-container"
        onClick={(e) => {
          const target = document.querySelector(".cart-modal-container");
          if (target === e.target) {
            props.setModal(false);
            document.body.style.overflow = "unset";
          }
        }}
      >
        <div className="cart-modal-bg">
          <div className="cart-modal-title">
            <h4>Your cart is empty.</h4>
          </div>

          <div className="cart-modal-button-container">
            <div className="cart-modal-button-flexbox">
              <button
                onClick={() => {
                  props.setModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                {props.btn1}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartModal;
