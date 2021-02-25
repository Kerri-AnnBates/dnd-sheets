import axios from "axios";

export const getClasses = async () => {
    const result = await axios.get("http://www.dnd5eapi.co/api/classes")
        .then(res => {
            return res.data.results;
        })
        .catch(err => {
            return err;
        });

    return result;
}
