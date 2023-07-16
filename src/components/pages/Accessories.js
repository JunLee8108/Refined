import AccSection from "../helpers/AccSection";
import { useParams } from "react-router-dom";

function Accessories() {
    let {id} = useParams();
    return (
        <AccSection id={id} />
    );
}

export default Accessories;