import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";

const AddBalanceDialog = ({
  isOpen,
  onClose,
  onAddExpense,
  initialData = {},
}) => {
  const [balance, setBalance] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    setBalance(initialData.balance || "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const balanceOld = localStorage.getItem("balance") || 0;
    const newBalance = parseFloat(balance) + parseFloat(balanceOld);
    localStorage.setItem("balance", newBalance);
    enqueueSnackbar(`Added ${balance} to your balance`, {
      variant: "success",
      autoHideDuration: 3000,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.title}>{"Add Balance"}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputRow}>
            <input
              type="number"
              placeholder="Income Amount"
              required
              style={styles.input}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />

            <button
              type="submit"
              style={{ ...styles.input, ...styles.addButton }}
            >
              Add Balance
            </button>
            <button
              type="cancel"
              style={{ ...styles.input, ...styles.cancelButton }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,

    backdropFilter: "blur(0px)",

    background: "#FFFFFFC4",
  },
  dialog: {
    position: "fixed",
    width: "90%",
    //538px in rem

    maxWidth: "33.625rem",
    padding: "20px",
    borderRadius: "1rem",
    height: "auto",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    backdropFilter: "blur(0px)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "Ubuntu",
    fontWeight: "700",
    color: "#000000",
    lineHeight: "100%",
    width: "201px",
    height: "34px",

    left: "401px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    boxShadow: "0px 4px 4px 0px #00000040",
    height: "51px",
    borderRadius: "15px",
    boxSizing: "border-box",
    border: "none",
    outline: "none",
    fontFamily: "Open Sans",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
  },
  inputRow: { display: "flex", justifyContent: "flex-start", gap: "1rem" },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  addButton: {
    backgroundColor: "#F4BB4A",
    color: "white",
    maxWidth: "50%",
    padding: "10px 20px",
    border: "none",

    cursor: "pointer",
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    padding: "10px 20px",

    maxWidth: "100px",
    border: "none",

    cursor: "pointer",
  },
};

export default AddBalanceDialog;
