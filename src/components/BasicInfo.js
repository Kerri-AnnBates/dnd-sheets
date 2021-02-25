import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { createProficienciesList } from './createProficienciesList';
import { createLanguagesList } from './createLanguagesList';
import { getClasses, getRaces } from '../api/api';

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
    const [proficiencies] = useState([]);
    const [languages] = useState([]);

    const fetchData = async () => {
        const classResults = await getClasses();
        const raceResults = await getRaces();

        if (classResults && raceResults) {
            console.log(raceResults);

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

    const onClassChange = (e) => {
        setClass(e.value.value);
    }

    const onRaceChange = (e) => {
        setRace(e.value.value);
    }

    const handleSubmit = (e) => {
        const chosenClass = e.chosenClass.name;
        const chosenRace = e.chosenRace.name;
        console.log("chosen class:", chosenClass);
        console.log("chosen race:", chosenRace);

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
                validationSchema={basicInfoSchema}
                onSubmit={e => handleSubmit(e)}
            >
                {() => (
                    <Form>
                        <div className="dropdownFormContainer">
                            <Field name="chosenRace" htmlFor="chosenRace">
                                {({ field }) =>
                                    <Dropdown
                                        {...field}
                                        id="chosenRace"
                                        name="chosenRace"
                                        className="dropdownFormElement"
                                        style={{ marginTop: '1rem' }}
                                        options={raceOptions}
                                        value={field}
                                        onChange={onRaceChange}
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
                                        // value={getClass}
                                        onChange={onClassChange}
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
