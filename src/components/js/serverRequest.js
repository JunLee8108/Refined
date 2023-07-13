import axios from "axios";

let selectionData = [];

const serverGet = () => {
    axios
    .get("./db/selectionImgs.json")
    .then((result) => {
        for (let i=0; i<result.data.length; i++) {
            selectionData.push(result.data[i]);
        }
    })
    .catch(() => {
        alert("Failed");
    })
}

export {selectionData, serverGet};