import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { createProficienciesList } from './createProficienciesList';
import { createLanguagesList } from './createLanguagesList';
import { getClasses, getRaces, getProficiencies, getLanguages } from '../api/api';

const basicInfoSchema = Yup.object().shape({
    chosenName: Yup.string().notRequired(),
    chosenClass: Yup.string().required('Class is required'),
    chosenRace: Yup.string().required('Race is required'),
});

const BasicInfo = () => {
    const [getName, setName] = useState("");
    const [classOptions, setClassOptions] = useState([]);
    const [raceOptions, setRaceOptions] = useState([]);
    const [getClass, setClass] = useState("");
    const [getRace, setRace] = useState("");
    const [proficiencies, setproficiencies] = useState([]);
    const [languages, setLanguages] = useState([]);

    const fetchData = async () => {
        const classResults = await getClasses();
        const raceResults = await getRaces();

        if (classResults && raceResults) {

            const classData = classResults.map(classes => {
                return {
                    label: classes.name,
                    value: classes.index
                }
            });

            const raceData = raceResults.map(races => {
                return {
                    label: races.name,
                    value: races.index
                }
            });

            setClassOptions(classData);
            setRaceOptions(raceData);
        } else {
            console.log("Error");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClassChange = (e) => {
        setClass(e.value);
    }

    const handleRaceChange = (e) => {
        setRace(e.value);
    }

    const handleSubmit = (e) => {
        const chosenClass = e.chosenClass.name;
        const chosenRace = e.chosenRace.name;

        if (getRace) {
            getLanguages(getRace)
                .then(data => {
                    const langs = data.map(lang => lang.name);
                    setLanguages(langs);
                });
        }

        if (getClass) {
            getProficiencies(getClass)
                .then(data => {
                    const profs = data.map(prof => prof.name);
                    setproficiencies(profs);
                });
        }

    }

    const setCharacterName = e => {
        setName(e);
    };

    return (
        <>
            <h2>Choose name, race & class</h2>
            <Formik>
                <Field name="chosenName">
                    {({ field }) =>
                        <span className='p-float-label' style={{ marginTop: '1rem' }}>
                            <InputText id='chosenName' {...field} value={getName} onChange={e => {
                                setCharacterName(e.target.value)
                            }} style={{ width: '100%' }} />
                            <label htmlFor='chosenName'>Enter Name</label>
                        </span>
                    }
                </Field>
            </Formik>
            <Formik
                initialValues={{
                    chosenClass: "",
                    chosenRace: ""
                }}
                // validationSchema={basicInfoSchema}
                onSubmit={e => handleSubmit(e)}
            >
                {() => (
                    <Form>
                        <div className="dropdownFormContainer">
                            <Field name="chosenRace" as="select">
                                {({ field }) =>
                                    <Dropdown
                                        {...field}
                                        id="chosenRace"
                                        name="chosenRace"
                                        className="dropdownFormElement"
                                        style={{ marginTop: '1rem' }}
                                        options={raceOptions}
                                        optionLabel={raceOptions.label}
                                        value={getRace}
                                        onChange={handleRaceChange}
                                        required
                                        placeholder="Select D&D Race" />}
                            </Field>
                            <ErrorMessage name='chosenRace' />

                            <Field name="chosenClass">
                                {({ field }) =>
                                    <Dropdown
                                        {...field}
                                        id="chosenClass"
                                        name="chosenClass"
                                        className="dropdownFormElement"
                                        style={{ marginTop: '1rem' }}
                                        options={classOptions}
                                        optionLabel={classOptions.label}
                                        value={getClass}
                                        required
                                        onChange={handleClassChange}
                                        placeholder="Select D&D Class" />}
                            </Field>
                            <ErrorMessage name='chosenClass' />
                            <Button type="submit" label="Select" className="dropdownFormElement dropdownFormButton p-button-raised" style={{ marginTop: '1rem' }} />
                        </div>
                    </Form>
                )}
            </Formik>
            <div>
                <h3 className="NameRaceClass">{getName} {(getName && getRace && getClass) ? "the" : null} {getRace} {getClass}</h3>
            </div>
            <div>
                {createProficienciesList(proficiencies)}
            </div>
            <div>
                {createLanguagesList(languages)}
            </div>
        </>
    );
};

export default BasicInfo;
