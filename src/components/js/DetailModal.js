function DetailModal(props) {
  return (
    <>
      <div
        className="modal-container"
        onClick={(e) => {
          const target = document.querySelector(".modal-container");
          if (target === e.target) {
            props.setModal(false);
            document.body.style.overflow = "unset";
          }
        }}
      >
        <div className={"detail-modal-bg " + props.modalFade}>
          <div className="modal-title">
            <h4>{props.displayName + " was added to your bag."}</h4>
          </div>

          <div style={{ marginBottom: "15px" }}></div>

          <div className="modal-button-container">
            <div className="modal-button-flexbox">
              <button
                onClick={() => {
                  props.navigate("/Cart");
                  props.setModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                VIEW BAG
              </button>
            </div>
            <div className="modal-button-flexbox">
              <button
                onClick={() => {
                  props.resetYourChoice();
                  props.setModal(false);
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

export default DetailModal;
