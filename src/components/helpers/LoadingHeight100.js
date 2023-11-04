import "./LoadingHeight100.css";

import PulseLoader from "react-spinners/PulseLoader";

export default function LoadingHeight100() {
  return (
    <>
      <div className="loading-height-container">
        <PulseLoader color="orange" />
      </div>
    </>
  );
}
