/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./ThemeSlider.css";
import { UserPreferencesContext } from "../context/UserPreferencesContext";

const ThemeSlider = () => {
    const { theme, toggleTheme } = useContext(UserPreferencesContext);
  
    return (
        <label className={`switch ${theme}`}>
            <input type="checkbox" className="input" onClick={toggleTheme} />
            <span className="slider"></span>
        </label>
    );
};

export default ThemeSlider;
