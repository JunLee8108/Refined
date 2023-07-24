import "./WishlistModal.css";

function WishlistSizeModal(props) {
  return (
    <>
      <div
        className="wishlist-modal-container"
        onClick={(e) => {
          const target = document.querySelector(".wishlist-modal-container");
          if (target === e.target) {
            props.setSizeModal(false);
            document.body.style.overflow = "unset";
          }
        }}
      >
        <div className={"wishlist-modal-bg " + props.modalFade}>
          <div className="wishlist-modal-title">
            <h4>{props.data[props.dataIndex].name}</h4>
            <h4>Choose your size.</h4>
          </div>

          <div className="wishlist-modal-button-container">
            <div className="wishlist-modal-button-flexbox flexbox-center">
              {props.data[props.dataIndex].size.map(function (a, index) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      props.handleSizeBtn(
                        props.data[props.dataIndex].size[index]
                      );
                    }}
                  >
                    {props.data[props.dataIndex].size[index]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistSizeModal;
