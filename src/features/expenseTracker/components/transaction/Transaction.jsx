import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineTravelExplore } from "react-icons/md";
import { PiPopcorn } from "react-icons/pi";
import AddBalanceDialog from "../Dialog/AddBalanceDialog";
import AddExpenseDialog from "../Dialog/AddDialog";
const RecentTransactions = ({ data }) => {
  const [count, setCount] = useState(0);
  const transactions = data?.slice(3 * count, 3 * (count + 1)) || [];
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    price: 0,
    category: "",
    date: "",
  });
  console.log(editData, "inititalData");
  const handleDelete = (id) => {
    console.log(id);
    // Get the current expense list from localStorage
    const localExpense = JSON.parse(localStorage.getItem("expenses")) || [];

    // Filter out the transaction with the matching id
    const updatedExpense = localExpense.filter(
      (transaction) => transaction.id !== id
    );

    // Update localStorage with the filtered list
    localStorage.setItem("expenses", JSON.stringify(updatedExpense));

    // Optionally, update the state if needed
    setCount(0); // Reset pagination if necessary
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recent Transactions</h2>
      <div style={styles.card}>
        {transactions.map((transaction) => (
          <div key={transaction.id} style={styles.transactionItem}>
            <div style={styles.leftSection}>
              <div style={styles.icon}>
                {" "}
                {transaction.category == "food" ? (
                  <IoFastFoodOutline />
                ) : transaction.category == "travel" ? (
                  <MdOutlineTravelExplore />
                ) : (
                  <PiPopcorn />
                )}
              </div>
              <div style={styles.textSection}>
                <div style={styles.category}>{transaction.category}</div>
                <div style={styles.date}>{transaction.date}</div>
              </div>
            </div>
            <div style={styles.rightSection}>
              <div style={styles.price}>₹{transaction.price}</div>
              <button
                style={styles.actionCancel}
                onClick={() => handleDelete(transaction.id)}
              >
                <MdOutlineCancel />
              </button>
              <button
                style={styles.actionButton}
                onClick={() => {
                  setIsOpenEdit(true);
                  if (transaction) {
                    setEditData(() => transaction); // Ensure transaction is passed correctly
                  }
                }}
              >
                <GoPencil />
              </button>
            </div>
          </div>
        ))}
        <div style={styles.pagination}>
          <button
            style={styles.paginationButton}
            onClick={() => {
              if (count > 0)
                setCount((prev) => {
                  return prev - 1;
                });
            }}
          >
            ←
          </button>
          <div style={styles.pageNumber}>{count + 1}</div>
          <button
            style={styles.paginationButton}
            onClick={() => {
              if (Math.ceil(data.length / 3) > count + 1) {
                setCount((prev) => prev + 1);
              }
            }}
          >
            →
          </button>
        </div>
      </div>
      <AddExpenseDialog
        initialData={editData || {}}
        isOpen={isOpenEdit}
        add={false}
        onClose={() => setIsOpenEdit(false)}
      />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "sans-serif",
    width: "100%",
  },
  heading: {
    fontFamily: "Ubuntu",
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: "2rem", // Default for mobile-first
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "flex-start",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

    margin: "0 auto",
  },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    margin: "15px 0",
    borderBottom: "1px solid #ddd",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    justifyContent: "flex-start",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "flex-end",
  },
  icon: {
    border: "none",
    borderRadius: "50%",
    fontWeight: 100,
    width: "37px",
    height: "37px",
    display: "flex",
    fontSize: "1.7rem",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000FF",
    cursor: "pointer",
    backgroundColor: "#D9D9D9",
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  category: {
    //     width: 59;
    //     height: 22;
    //     top: 478px;
    //     left: 114px;
    //     font-family: Open Sans;
    // font-weight: 400;
    // font-size: 16px;
    // line-height: 100%;
    // letter-spacing: 0%;

    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    color: "#000000",
    marginBottom: "5px",
  },
  date: {
    // width: 115;
    // height: 22;
    // top: 501px;
    // left: 114px;
    //     font-family: Open Sans;
    // font-weight: 400;
    // font-size: 16px;
    // line-height: 100%;
    // letter-spacing: 0%;
    // background: #9B9B9B;
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    color: "#9B9B9B",
  },
  price: {
    marginRight: "10px",
    color: "#F4BB4A",

    fontFamily: "Open Sans",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "100%",
  },
  actionButton: {
    backgroundColor: "#FFB34FFF",
    border: "none",
    borderRadius: "15px",
    width: "37px",
    height: "37px",
    display: "flex",
    fontSize: "1.3rem",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  actionCancel: {
    backgroundColor: "#D01A1AFF",
    border: "none",
    borderRadius: "15px",
    fontSize: "1.3rem",
    color: "#FFFFFF",
    width: "37px",
    height: "37px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  paginationButton: {
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    margin: "0 5px",
    cursor: "pointer",
  },
  pageNumber: {
    padding: "8px 12px",
  },
};

export default RecentTransactions;
