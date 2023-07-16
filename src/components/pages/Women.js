import WomenSection from "../helpers/WomenSection";
import { useParams } from "react-router-dom";

function Women() {
    let {id} = useParams();
    return (
        <WomenSection id={id} />
    );
}

export default Women;