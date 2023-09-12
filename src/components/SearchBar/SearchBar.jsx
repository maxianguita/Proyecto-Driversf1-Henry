import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDrivers, paginadoGlobal } from "../../actions";
import styles from "./SearchBar.module.css"

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (element) => {
        element.preventDefault()
        setName(element.target.value)
        //console.log(name);
    }

    function handleSubmit(element) {
        element.preventDefault()
        dispatch(getNameDrivers(name))
        dispatch(paginadoGlobal(1))
    }

    return (
        <div className={styles.searchBar}>
            <input
            className={styles.barraBusqueda}
            type="text"
            placeholder="Buscar driver..."
            onChange={(element) => handleInputChange(element)}
            />
            <button className={styles.botonSearch} type="submit" onClick={(element) => handleSubmit(element)}>Buscar</button>
        </div>
    )
}

export default SearchBar;