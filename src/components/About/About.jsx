import React from "react";
import styles from "./About.module.css";
import NavBar from "../NavBar/NavBar";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.aboutContainer}>
        <h2 className={styles.title}>Descubre más sobre la Fórmula 1</h2>
        <div className={styles.contentContainer}>
          <div className={styles.leftContent}>
            <p className={styles.description}>
              La Fórmula 1 es la máxima categoría del automovilismo deportivo, conocida por su alta tecnología,
              velocidad y competencia entre los mejores pilotos y equipos del mundo.
            </p>
            <p className={styles.techInfo}>
              Esta aplicación fue desarrollada utilizando las siguientes tecnologías:
              </p>
            <div>   
            
            <ul className={styles.techList}>
              <li>
                <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                  React
                </a>{' '}
                para el frontend.
              </li>
              <li>
                <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                  Redux
                </a>{' '}
                para la administración del estado.
              </li>
              <li>
                <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
                  Node.js
                </a>{' '}
                para el backend.
              </li>
              <li>
                <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">
                  Express
                </a>{' '}
                como framework para construir la API.
              </li>
              <li>
                <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">
                  PostgreSQL
                </a>{' '}
                como sistema de gestión de base de datos.
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  F1 API
                </a>{' '}
                para obtener información sobre los corredores.
              </li>
            </ul>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
