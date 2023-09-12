import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { getDrivers } from "../../actions";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const todosDrivers = useSelector((state) => state.allDrivers);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    // Simula una carga de 1 segundo antes de mostrar el contenido
    setTimeout(() => {
      dispatch(getDrivers())
        .then(() => {
          setIsLoading(false); // Cuando se complete la carga, establece isLoading en falso
        });
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    const driverFiltered = todosDrivers.find((element) => {
      if (typeof element.id === "number") {
        return element.id === Number(id);
      } else {
        return element.id === id;
      }
    });

    if (driverFiltered) {
      setDriver(driverFiltered);
    } else {
      //window.alert('No hay personajes con ese ID');
    }
  }, [todosDrivers, id]);

  return (
    <div>
      <NavBar />
      <div>
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
      <div className={styles.detailContainer}>
        {isLoading ? (
          // Muestra el componente de Loading centrado
          <div className={styles.containerLoading}>
            <Loading />
          </div>
        ) : (
          // Muestra el contenido del detalle
          <div className={styles.divDetail}>
            <div className={styles.leftColumn}>
              <img className={styles.imgDriver} src={driver.image} alt="" />
            </div>
            <div className={styles.rightColumn}>
              <h2>ID | {id && id}</h2>
              <h2>Nombre | {driver.forename && driver.forename}</h2>
              <h2>Apellido | {driver.surname && driver.surname}</h2>
              <h2>Nacionalidad | {driver.nationality && driver.nationality}</h2>
              <h2 className={styles.description}>Descripción | {driver.description && driver.description}</h2>
              <h2>Fecha de Nacimiento | {driver.dob && driver.dob}</h2>
              <h3 className={styles.teamsDiv}>
                | Teams | {driver.createdInDb ? driver.Teams && <p>{driver.Teams.map((team) => team.name).join(", ")}</p> : <p>{driver.teams}</p>}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;




 