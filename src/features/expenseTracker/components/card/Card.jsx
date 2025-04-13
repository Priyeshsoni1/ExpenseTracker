import React from "react";
import styles from "./Card.module.css";
import { Button } from "../button/Button";
const Card = ({ title, buttonTitle, income, onClick, money }) => {
  return (
    <div className={styles.card}>
      <span className={styles.title}>
        {title}:{" "}
        <span
          className={styles.price}
          style={{ color: income ? "#9DFF5B" : "#F4BB4A" }}
        >
          {money}
        </span>
      </span>
      <Button onClick={onClick} success={income}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default Card;
