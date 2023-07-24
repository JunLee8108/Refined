import "./MobileMenuBtn.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MobileMenuBtn(props) {
  return (
    <div className="mobile-btn">
      <li>
        <button onClick={props.closeMobileModal}>
          <FontAwesomeIcon icon={props.icons} size="xl" />
        </button>
      </li>
    </div>
  );
}

export default MobileMenuBtn;
