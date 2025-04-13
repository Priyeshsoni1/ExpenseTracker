import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
const AddExpenseDialog = ({
  dialogTitle = "Add Expense",
  isOpen,
  onClose,
  onAddExpense,
  initialData = {},
  add = true,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  console.log(initialData, "initialData");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setPrice(initialData.price || "");
      setCategory(initialData.category || "");
      setDate(initialData.date || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the new expense data
    const data = add
      ? { id: v4(), title, price: parseFloat(price), category, date }
      : { ...initialData, title, price: parseFloat(price), category, date };

    // Retrieve existing expenses from localStorage
    const expenseOld = JSON.parse(localStorage.getItem("expense")) || [];

    if (add) {
      localStorage.setItem("expense", JSON.stringify([...expenseOld, data]));
      enqueueSnackbar(`Added ${title} to your expense`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      const newExpense = expenseOld.filter((item) => {
        if (item?.id != initialData?.id) return item;
      });
      localStorage.setItem("expense", JSON.stringify([...newExpense, data]));
      enqueueSnackbar(`Updated ${title} to your expense`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    }

    // Close the dialog
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.title}>{dialogTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputRow}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              style={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div style={styles.inputRow}>
            <select
              style={styles.input}
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
              {/* Add more categories as needed */}
            </select>
            <input
              required
              name="date"
              type="date"
              style={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div style={styles.inputRow}>
            <button
              type="submit"
              style={{ ...styles.input, ...styles.addButton }}
            >
              Add Expense
            </button>
            <button
              type="button"
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

export default AddExpenseDialog;
