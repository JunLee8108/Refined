import { useParams } from "react-router-dom";
import MenSection from "../helpers/MenSection"

function Men() {
    let {id} = useParams();
    return (
        <MenSection id={id}/>
    );
}

export default Men;