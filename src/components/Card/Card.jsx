import React from "react";
import styles from "./Card.module.css";

const Card = ({ name, image, teams, dob, createdInDb, Teams }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.teams}>
        {createdInDb
          ? Teams.map((team) => team.name).join(", ")
          : teams}
      </p>
      <h5 className={styles.dob}>{dob}</h5>
      <img src={image} alt="No hay imagen" className={styles.image} />
    </div>
  );
}
export default Card;
