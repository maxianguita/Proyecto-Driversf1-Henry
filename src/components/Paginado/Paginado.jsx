import React from "react";
import styles from "./Paginado.module.css";

 const Paginado = ({ driversPerPage, allDrivers, paginado, currentPage }) => {
  // Calcula el número total de páginas necesarias para la paginación
  const totalPages = Math.ceil(allDrivers.length / driversPerPage);

  // Obtener el rango de páginas a mostrar en el paginado
  const getPageRange = () => {
    const rangeSize = 5; // Tamaño del rango de páginas a mostrar
    const rangeMiddle = Math.ceil(rangeSize / 2);
    let start = currentPage - rangeMiddle + 1;
    let end = currentPage + rangeMiddle - 1;

    if (start < 1) {
      start = 1;
      end = Math.min(rangeSize, totalPages);
    } else if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - rangeSize + 1);
    }
      // Creamos un arreglo de números para representar las páginas en el rango
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

// Obtener el rango de números de página
  const pageNumbers = getPageRange();

  return (
    <nav className={styles.paginadoContainer}>
      <ul className={styles.paginadoList}>
        {pageNumbers.map((number) => (
          <li
            className={`${styles.paginadoItem} ${
              number === currentPage ? styles.active : ""
            }`}
            key={number}
          >
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Paginado;