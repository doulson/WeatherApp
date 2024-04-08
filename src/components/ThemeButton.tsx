import React, { useState, useEffect } from "react";
//3rd party libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun as fasSun } from "@fortawesome/free-solid-svg-icons"; // Solid sun
import { faSun as farSun } from "@fortawesome/free-regular-svg-icons"; // Regular sun

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const localPreference = localStorage.getItem("darkMode");
    document.documentElement.setAttribute(
      "data-theme",
      localPreference ? "dark" : "light"
    );

    return localPreference ? JSON.parse(localPreference) : false;
  });

  // Update the class and localStorage based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <button
      className="btn-sm btn-ghost bg-gray-500/30 px-2 py-1 rounded border-0 text-gray-700 dark:text-white transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      onClick={() => setDarkMode(!darkMode)}
    >
      <FontAwesomeIcon icon={darkMode ? farSun : fasSun} />
    </button>
  );
};

export default DarkModeToggle;
