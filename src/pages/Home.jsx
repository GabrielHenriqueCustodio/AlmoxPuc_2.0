import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "./Home.module.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const marginLeft = isMobile ? "0" : isSidebarOpen ? "15%" : "5%";

  return (
    <div className={styles.home}>
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div
        className={styles.frame}
        style={{
          marginLeft,
          transition: "margin-left 0.6s ease",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Home;