import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDriver, getTeams, filterRestart } from "../../actions";
import styles from "./DriverCreate.module.css"
import Footer from "../Footer/Footer"
import Navbar from "../NavBar/NavBar"

const backgroundImageUrl =
  "https://cdn-images.motor.es/image/m/694w.webp/fotos-noticias/2019/12/red-bull-mejor-equipo-boxes-f1-2019-mclaren-cuarto-201963004-1575313633_1.jpg";

function validation(input) {
    let errors = {};
    if (!input.forename || !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(input.forename)) {
        errors.forename = "Debe tener un nombre válido con la primera letra mayúscula y permitir nombres compuestos de hasta 255 caracteres.";
    } else if (!input.surname || !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(input.surname)) {
        errors.surname = "Debe tener apellido valido, con primera letra mayúscula. Permite compuestos separados por un guión (-)";
    } else if (!input.nationality || !/^[a-zA-Z]+$/.test(input.nationality)) {
        errors.nationality = "Debe ingresar un país valido";
    } else if (!input.dob || !/\b(18[5-9][0-9]|19[0-9]{2}|20[0-2][0-9]|2023)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\b/.test(input.dob)) {
        errors.dob = "[Formato AÑO-MES-DIA] Dia: 1 - 31 // Mes: 1 - 12 // Año: 1850 / 2023";
    } else if (!input.description) {
        errors.description = "Debe contener descripción";
    } else if (!input.image) {
        errors.image = "Debe contener fecha de imagen";
    }
    return errors;
}

const DriverCreate = () => {
    const dispatch = useDispatch()
    const allTeams = useSelector((state) => state.teams)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        forename: "",
        surname: "",
        description: "",
        nationality: "",
        dob: "",
        image: "",
        createdInDb: true,
        teamsArr: [],   // Nueva propiedad aux, actualiza el array de equipos
        formSubmitted: false
    });

     // Función para manejar el cambio en los campos de entrada
    function handleChange(event) {
        //console.log(input);
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }))

    }

    // Función para manejar la selección de equipos
    function handleSelect(event) {
        const selectedTeam = allTeams.find((team) => team.name === event.target.value);

        if (input.teamsArr.length >= 5) {
            alert("Solo se permite seleccionar hasta 5 equipos por conductor");
            return;
        }
        if(input.teamsArr.includes(selectedTeam)) {
            return;
        } else {
            setInput((prevState) => ({
                ...prevState,
                teamsArr: [...prevState.teamsArr, selectedTeam]
            }));
        }    
    }
     // Función para manejar el envío del formulario
    function handleSubmit(event) {
        event.preventDefault();
        setErrors(validation(input));
        setInput((prevInput) => ({ ...prevInput, formSubmitted: true }));

        if (Object.keys(errors).length === 0 && input.forename !== "" && input.surname !== "" && input.nationality !== "" && input.dob !== "" && input.description !== "" && input.image !== "") {
            const teamNames = input.teamsArr.map((team) => team.name); // Extrae solo los name de teams

            dispatch(postDriver({ ...input, teams: teamNames })); // Pasa los names de los equipos en lugar de input.teamsArr
            dispatch(filterRestart())
            alert("Driver creado\nFiltros restablecidos");
            setInput({
                forename: "",
                createdInDb: true,
                surname: "",
                nationality: "",
                dob: "",
                description: "",
                image: "",
                teamsArr: [],
                formSubmitted: false
            });
        } else {
            alert("Debe ingresar todos los datos.");
        }
    }

      // Función para manejar la eliminación de equipos seleccionados
    function handleDelete(element) {
        const updatedTeamsArr = input.teamsArr.filter((team) => team !== element);

        setInput((prevState) => ({
            ...prevState,
            teamsArr: updatedTeamsArr
        }));
    }

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    return (
        
        <div className={styles.background}>
             <div>
            <Navbar/>
           <div/>
            <div className={styles.card}> 
                <h1>Crea tu driver</h1>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className={styles.column}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={input.forename}
                            name="forename"
                            onChange={(event) => handleChange(event)}
                        />
                        {
                            errors.forename && (<p className={styles.errors}>{errors.forename}</p>)
                        }
                        <label>Apellido:</label>
                        <input
                            type="text"
                            value={input.surname}
                            name="surname"
                            onChange={(event) => handleChange(event)}
                        />
                        {
                            errors.surname && (<p className={styles.errors}>{errors.surname}</p>)
                        }
                        <label>Nacionalidad:</label>
                        <input
                            type="text"
                            value={input.nationality}
                            name="nationality"
                            onChange={(event) => handleChange(event)}
                        />
                        {
                            errors.nationality && (<p className={styles.errors}>{errors.nationality}</p>)
                        }
                        <label>Fecha de Nacimiento:</label>
                        <input
                          type="date"
                          value={input.dob}
                             name="dob"
                            onChange={(event) => handleChange(event)}
                            />
                            {
                             errors.dob && (<p className={styles.errors}>{errors.dob}</p>)
                           }

                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={(event) => handleChange(event)}
                            autoComplete="off" 
                        />
                        {
                            errors.description && (<p className={styles.errors}>{errors.description}</p>)
                        }
                        <label>Imagen:</label>
                        <input
                            type="text"
                            value={input.image}
                            name="image"
                            onChange={(event) => handleChange(event)}
                        />
                        {
                            errors.image && (<p className={styles.errors}>{errors.image}</p>)
                        }
                        <select onChange={(event) => handleSelect(event)}>
                            {allTeams.map((element) => (
                                <option value={element.name} key={element.id}>
                                    {element.name}
                                </option>
                            ))}
                        </select>

                        <button 
                            type="submit"
                            className={Object.keys(errors).length > 0 || input.forename === "" ? styles.disabledButton : ""}
                            disabled={Object.keys(errors).length > 0}
                        >
                            Crear Driver
                        </button>
                    </div>
                </form>
                <div className={`${styles.teamsList} ${styles.column}`}>
                    {input.teamsArr.map((element) => (
                        <div key={element.id}>
                            <p>{element.name}</p>
                            <button onClick={() => handleDelete(element)}>x</button>
                        </div>
                    ))}
                </div>
               </div>
            <Footer/>
            </div>
        </div>
    )
}
export default DriverCreate;