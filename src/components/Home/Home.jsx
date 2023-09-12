import {  React } from "react"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDrivers, getTeams, filterDriversByDob, filterByName, filterCreated, paginadoGlobal, selectedTeam, firstCallDrivers, filterRestart } from "../../actions"
import { Link } from "react-router-dom"
import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado"
import NavBar from "../NavBar/NavBar"
import styles from "./Home.module.css"
import Footer from '../Footer/Footer'
import SearchBar from "../SearchBar/SearchBar";
import Loading from  "../Loading/Loading";


const Home = () => {
    const location = useLocation();
   
    const dispatch = useDispatch()
    const all = useSelector((state) => state.allDrivers)
    const allDrivers = useSelector((state) => state.drivers) //Traeme todo lo que trae el estado (de drivers) REACT-REDUX
    const allTeams = useSelector((state) => state.teams)
    const currentPageGlobal = useSelector((state) => state.currentPage)
    const filterTeamsHome = useSelector((state) => state.filterTeams)
    const [currentPage, setCurrentPage] = useState(currentPageGlobal)
    const [noCreated, setNoCreated] = useState(false)
    const driversPerPage = 9
    const indexLastDriver = currentPage * driversPerPage // 9
    const indexFirstDriver = indexLastDriver - driversPerPage // 0
    const currentDrivers = allDrivers.length ? allDrivers.slice(indexFirstDriver, indexLastDriver) : all.slice(indexFirstDriver, indexLastDriver)

   // agrego el estado para controlar si se esta cargando 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Realiza la carga de datos
        dispatch(getDrivers())
            .then(() => {
                // Cuando se complete la carga, establece isLoading en falso
                setTimeout(() => {
                    setIsLoading(false);
                  }, 1000); // Cambia el valor de la carga para ajustar la duración deseada
                
            });
    }, [dispatch]);

    useEffect(() => {
        dispatch(paginadoGlobal(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        setCurrentPage(currentPageGlobal);
    }, [currentPageGlobal]);

    useEffect(() => {
        dispatch(getTeams());
    }, []);

    useEffect(() => {
        if (filterTeamsHome.length && !allDrivers.length) {
            setNoCreated(true);
            setTimeout(() => {
                setNoCreated(false);
            }, 3000); // Ocultar el alert después de 3 segundos (puedes ajustar el tiempo según tus necesidades)
        }
    }, [filterTeamsHome, allDrivers]);

// aca voy a crear tarjetas visuales para mostrar información de los drivers
    function handleClick(event) {
        event.preventDefault();
        dispatch(getDrivers())
        dispatch(firstCallDrivers())
        dispatch(filterRestart())
        dispatch(paginadoGlobal(1))
    }
    const renderCards = () => {
        return currentDrivers.map((driver) => (
            <div className={styles.cardContainer} key={driver.id}>
                <Link to={`/detail/${driver.id}`}>
                    <Card
                        name={`${driver.forename} ${driver.surname}`}
                        image={driver.image ? driver.image : <img src="https://i.imgur.com/NVCjx9c.png" />}
                        teams={driver.teams || "Toca para ver su equipo"}
                        dob={driver.dob ? driver.dob : ""}
                        createdInDb={driver.createdInDb ? driver.createdInDb : false}
                        Teams={driver.Teams ? driver.Teams : []}

                    />
                </Link>
            </div>
        ));
    };

     // Esta función es para manejar la selección de un equipo en el filtro
    function handleSelect(event) {
        const selectedTeamFilter = event.target.value;
        //(selectedTeamFilter);

        const filteredDriversAPI = all.filter((driver) => driver.teams && driver.teams.includes(selectedTeamFilter));

        const filteredDriversDb = all.filter((driver) => {
            if (driver.createdInDb && driver.Teams) {
                return driver.Teams.some((team) => team.name.includes(selectedTeamFilter));
            }
            return false;
        });

        //console.log(filteredDriversAPI);
        //console.log(filteredDriversDb);

        const filteredDrivers = [...filteredDriversAPI, ...filteredDriversDb]

        dispatch(paginadoGlobal(1));
        dispatch(selectedTeam(filteredDrivers));
    }

    // Función para manejar el filtro por fecha de nacimiento
    function handleFilterDob(event) {
        dispatch(filterDriversByDob(event.target.value))
    }

     // Función para manejar el filtro por nombre
    function handleFilterName(event) {
        dispatch(filterByName(event.target.value))
    }

     // Función para manejar el filtro por creados/existentes
    function handleCreated(event) {
        dispatch(filterCreated(event.target.value));
        dispatch(paginadoGlobal(1));
    } 

     // Función para manejar el cambio de página en el paginado
    const handlePaginado = (pageNumber) => {
        dispatch(paginadoGlobal(pageNumber));
        paginado(pageNumber);
    };

   
    return (
        <div className={styles.divPadre}>
            
                    {location.pathname !== '/' && <NavBar />}
                    <div className={styles.searchContainer}>
                        <SearchBar />
                    </div>
                    {isLoading ? (
                <Loading />
                ) : (
                <>
    
                    <div className={styles.divSelects}>
                        <div className={styles.contenedor}>
                            <h4>Filtros</h4>
                            <select onChange={event => handleCreated(event)}>
                                <option value="All">Todos los drivers</option>
                                <option value="created">Creados</option>
                                <option value="api">Existentes</option>
                            </select>
    
                            <select onChange={(event) => handleSelect(event)}>
                                <option value="">Todos los equipos</option>
                                {allTeams.map((element) => (
                                    <option value={element.name} key={element.id}>
                                        {element.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {noCreated && (
                            <div className={styles.alertContainer}>
                                <div className={styles.alert}>
                                    No se encontraron drivers en la base de datos. Cree un nuevo driver y reinicie su búsqueda.
                                </div>
                            </div>
                        )}
    
                        <div>
                            <h4>Ordenamiento</h4>
                            <select onChange={event => handleFilterName(event)}>
                                <option value="All">Todos</option>
                                <option value="asc">A - Z</option>
                                <option value="desc">Z - A</option>
                            </select>
    
                            <select onChange={event => handleFilterDob(event)}>
                                <option value="ascDob">Conductores Jovenes</option>
                                <option value="descDob">Conductores Antiguos</option>
                            </select>
                        </div>
                        <button className={styles.botonCargar} onClick={event => { handleClick(event) }}>
                            Mostrar todos los drivers
                        </button>
    
                        <Paginado driversPerPage={driversPerPage} allDrivers={allDrivers.length ? allDrivers : all} paginado={handlePaginado} currentPage={currentPageGlobal} />
    
                        <div className={styles.cardsContainer}>{renderCards()}</div>
                        <Footer />
                    </div>
                </>
            )}
        </div>
)};
    
export default Home;