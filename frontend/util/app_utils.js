import uuid from "uuid"

const generate_random_key = () => {
    return uuid.v4();
}


export default generate_random_key