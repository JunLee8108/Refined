import DetailSection from "../helpers/DetailSection";
import { useParams } from "react-router-dom";

function Detail() {
    let {id} = useParams();
    let {name} = useParams();
    return (
        <DetailSection id={id} name={name} />
    );
}

export default Detail;