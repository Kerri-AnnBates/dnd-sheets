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
    const [raceOptions, setRaceResults] = useState([]);
    const [getClass] = useState("");
    const [getRace] = useState("");
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
            setRaceResults(raceData);
        } else {
            console.log("Error");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        const chosenClass = e.chosenClass.name;
        const chosenRace = e.chosenRace.name;
    }

    const setCharacterName = e => {
        setName(e);
    };

    return (
        <>
            <h2>Choose name, race & class</h2>
            <Formik>
                <Field name="chosenName" render={({ field }) =>
                    <span className='p-float-label' style={{ marginTop: '1rem' }}>
                        <InputText id='chosenName' {...field} value={getName} onChange={e => {
                            setCharacterName(e.target.value)
                        }} style={{ width: '100%' }} />
                        <label htmlFor='chosenName'>Enter Name</label>
                    </span>
                } />
            </Formik>
            <Formik
                initialValues={{
                    chosenClass: '',
                    chosenRace: ''
                }}
                validationSchema={basicInfoSchema}
                onSubmit={e => handleSubmit(e)}
                render={() => (
                    <Form>
                        <div className="dropdownFormContainer">
                            <Field name="chosenRace" render={({ field }) =>
                                <Dropdown
                                    {...field}
                                    className="dropdownFormElement"
                                    style={{ marginTop: '1rem' }}
                                    optionLabel="label"
                                    options={raceOptions}
                                    placeholder="Select D&D Race" />} />
                            <ErrorMessage name='chosenRace' />

                            <Field name="chosenClass" render={({ field }) =>
                                <Dropdown
                                    {...field}
                                    className="dropdownFormElement"
                                    style={{ marginTop: '1rem' }}
                                    optionLabel="label"
                                    options={classOptions}
                                    value={classOptions}
                                    placeholder="Select D&D Class" />} />
                            <ErrorMessage name='chosenClass' />
                            <Button label="Select" className="dropdownFormElement dropdownFormButton p-button-raised" style={{ marginTop: '1rem' }} />
                        </div>
                    </Form>
                )}
            />
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
