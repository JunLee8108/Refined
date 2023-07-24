import "./MobileIndicator.css";

function MobileIndicator(props) {
  return (
    <li className="menu-mobile" onClick={props.closeMobileModal}>
      {props.contentName.innerHTML}.
    </li>
  );
}

export default MobileIndicator;
