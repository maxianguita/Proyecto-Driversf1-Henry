import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { firstCallDrivers } from "../../actions";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import videoUrl from "../../video/Formula1.mp4"

const LandingPage = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    dispatch(firstCallDrivers());
    videoRef.current.play();
    videoRef.current.volume = 0.2; 
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        loop
        className={styles.videoBackground}
        playsInline 
      >
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no admite la reproducción de video.
      </video>

      <div className={styles.landingBox}>
        <h1 className={styles.title}>CALENTANDO MOTORES...</h1>
        <Link to="/home" className={styles.buttonLink}>
          <button className={styles.cta}>
            <span className={styles.span}>LETS GO TO RACE!</span>
            <span className={styles.second}></span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
