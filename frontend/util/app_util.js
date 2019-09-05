import uuid from "uuid"

const generateRandomKey = () => {
    return uuid.v4();
}


export default generateRandomKey