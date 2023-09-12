import React from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();

    return (
        <div className={styles.divContenedorSearchBar}>
            
            <NavLink to='/landingpage'> 
                <button className={styles.botonesNav}>LandingPage</button>
            </NavLink>

            {location.pathname !== "/home" && (
                <Link to='/home'>
                    <button className={styles.botonesNav}>Home</button>
                </Link>
            )}
            
            <NavLink to='/driver'>
                <button className={styles.botonesNav}>Create</button>
            </NavLink>
            
            <NavLink to='/about'>
                <button className={styles.botonesNav}>About</button>
            </NavLink>
        </div>
    )
}

export default NavBar;
