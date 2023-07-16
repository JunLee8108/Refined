import ItemSection from "../helpers/ItemSection";
import { useParams } from "react-router-dom";

function Item() {
    let {category} = useParams();
    let {type} = useParams();

    return (
        <ItemSection category={category} type={type} />
    );
}

export default Item