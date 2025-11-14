import React, { useEffect, useState } from "react";
import {FaSun, FaMoon} from 'react-icons/fa';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}   
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
