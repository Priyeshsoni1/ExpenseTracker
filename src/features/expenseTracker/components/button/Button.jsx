import React, { Children } from "react";
import styles from "./Button.module.css";
export const Button = ({ children, onClick, success }) => {
  return (
    <button
      className={`${styles.commonButton}  ${
        success ? styles.buttonIncome : styles.buttonExpense
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
