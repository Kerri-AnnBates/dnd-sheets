import axios from "axios";

export const getClasses = () => {
    const result = axios.get("http://www.dnd5eapi.co/api/classes")
        .then(res => {
            return res.data.results;
        })
        .catch(err => {
            return err;
        });

    return result;
}

export const getRaces = () => {
    const result = axios.get("http://www.dnd5eapi.co/api/races")
        .then(res => {
            return res.data.results;
        })
        .catch(err => {
            return err;
        });

    return result;
}

export const getProficiencies = (classType) => {
    const results = axios.get(`http://www.dnd5eapi.co/api/classes/${classType}`)
        .then(res => {
            return res.data.proficiencies;
        })
        .catch(err => {
            return err;
        })

    return results;
}

export const getLanguages = (race) => {
    const results = axios.get(`http://www.dnd5eapi.co/api/races/${race}`)
        .then(res => {
            return res.data.languages;

        })
        .catch(err => {
            return err;
        })

    return results;
}