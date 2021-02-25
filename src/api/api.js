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

export const getRaces = async () => {
    const result = await axios.get("http://www.dnd5eapi.co/api/races")
        .then(res => {
            return res.data.results;
        })
        .catch(err => {
            return err;
        });

    return result;
}

export const getProficiencies = async (classType) => {
    const results = await axios.get(`http://www.dnd5eapi.co/api/classes/${classType}`)
        .then(res => {
            console.log(res.data.proficiencies);
            return res.data.proficiencies;

        })
        .catch(err => {
            return err;
        })

    return results;
}

export const getLanguages = async (race) => {
    const results = await axios.get(`http://www.dnd5eapi.co/api/races/${race}`)
        .then(res => {
            console.log(res.data.languages);
            return res.data.languages;

        })
        .catch(err => {
            return err;
        })

    return results;
}