import React, { useState, useEffect } from "react";
import { FaHome, FaTools, FaClipboardList, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo_sf from "../assets/logo_sf.png";

const Sidebar = ({ setIsSidebarOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile) {
      setMenuOpen(true);
      setIsSidebarOpen(true);
    }
  }, [isMobile, setIsSidebarOpen]);

  const onEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      setIsSidebarOpen(true);
    }
  };
  const onLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={styles.logoContainer}>
        <img src={logo_sf} alt="Logo" className={styles.logo} />
      </div>
      <Link
        to="/home"
        className={styles.icon}
        style={{ pointerEvents: isHovered || menuOpen ? "auto" : "none" }}
        onClick={() => {
          if (!isMobile) {
            setMenuOpen(false);
            setIsSidebarOpen(false);
          }
        }}
      >
        <FaHome />
        <span className={styles.label}>Home</span>
      </Link>

      <Link
        to="/home/ferramentas"
        className={styles.icon}
        style={{ pointerEvents: isHovered || menuOpen ? "auto" : "none" }}
        onClick={() => {
          if (!isMobile) {
            setMenuOpen(false);
            setIsSidebarOpen(false);
          }
        }}
      >
        <FaTools />
        <span className={styles.label}>Ferramentas</span>
      </Link>

      <Link
        to="/home/requisicoes"
        className={styles.icon}
        style={{ pointerEvents: isHovered || menuOpen ? "auto" : "none" }}
        onClick={() => {
          if (!isMobile) {
            setMenuOpen(false);
            setIsSidebarOpen(false);
          }
        }}
      >
        <FaClipboardList />
        <span className={styles.label}>Requisições</span>
      </Link>

      <Link
        to="/home/status-requisicao"
        className={styles.icon}
        style={{ pointerEvents: isHovered || menuOpen ? "auto" : "none" }}
        onClick={() => {
          if (!isMobile) {
            setMenuOpen(false);
            setIsSidebarOpen(false);
          }
        }}
      >
        <FaChartLine />
        <span className={styles.label}>Status</span>
      </Link>
    </div>
  );
};

export default Sidebar;
