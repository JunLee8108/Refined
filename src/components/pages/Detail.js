import DetailSection from "../helpers/DetailSection";
import { useParams } from "react-router-dom";

function Detail() {
    let {category} = useParams();
    let {type} = useParams();
    let {name} = useParams();
    let {id} = useParams();
    return (
        <DetailSection category={category} type={type} name={name} id={id} />
    );
}

export default Detail;