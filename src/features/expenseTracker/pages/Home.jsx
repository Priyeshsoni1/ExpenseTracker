import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Button } from "../components/button/Button";
import styles from "./Home.module.css";
import Card from "../components/card/Card";
import PieChartComponent from "../components/pieChart/PieChart";
import RecentTransactions from "../components/transaction/Transaction";
import AddExpenseDialog from "../components/Dialog/AddDialog";
import AddBalanceDialog from "../components/Dialog/AddBalanceDialog";

import BarChartComp from "../components/barChart/BarChart";
const Home = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  //models
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  const [categroySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categroyCounts, setCategoryCounts] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const localBalance = localStorage.getItem("balance");
    const localExpense = JSON.parse(localStorage.getItem("expenses"));
    if (localExpense) {
      setExpenseList(localExpense);
      const totalExpense = localExpense.reduce((acc, curr) => {
        return acc + parseInt(curr.price);
      }, 0);
      setExpense(totalExpense);
      setBalance(
        localBalance
          ? parseInt(localBalance) - totalExpense
          : 5000 - totalExpense
      );
    }
    if (localExpense) {
      const localCategorySpends = localExpense.reduce((acc, curr) => {
        acc[curr.category] = acc[curr.category]
          ? acc[curr.category] + curr.amount
          : curr.amount;
        return acc;
      }, {});
      setCategorySpends(localCategorySpends);
    }
    setExpenseList(localExpense);
    if (localBalance) {
      setBalance(JSON.parse(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", JSON.stringify(5000));
    }
    setIsMounted(true);
  }, [localStorage.getItem("balance"), localStorage.getItem("expenses")]);
  console.log(expenseList, "expenseList");
  useEffect(() => {
    console.log("trigger");
    if (isMounted == true && expenseList) {
      console.log(expenseList, "inside");
      const categorySpendLocal = expenseList.reduce((acc, curr) => {
        const category = curr.category;
        const price = parseInt(curr.price);
        acc[category] = acc[category] ? acc[category] + price : price || 0;
        console.log(acc);
        return acc;
      }, {});
      console.log(categorySpendLocal, "categorySpendLocal");
      setCategorySpends(categorySpendLocal);
      const categoryCountLocal = expenseList.reduce((acc, curr) => {
        const category = curr.category;

        acc[category] = acc[category] ? acc[category] + 1 : 1;
        return acc;
      }, {});
      setCategoryCounts(categoryCountLocal);
    }
  }, [isMounted, expenseList]);

  return (
    <>
      <div className={styles.addButtonWrapper}>
        <h1>Expense Tracker</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          <Card
            title={" Wallet Balance"}
            money={balance}
            buttonTitle={"+ Add Income"}
            income={true}
            onClick={() => setIsOpenBalance(true)}
          />
          <Card
            title={"Expense"}
            buttonTitle={"+ Add Expense"}
            income={false}
            money={expense}
            onClick={() => setIsOpenExpense(true)}
          />
          <PieChartComponent data={categroySpends} />{" "}
        </div>{" "}
        <div className={styles.transactionsWrapper}>
          {" "}
          <RecentTransactions
            data={expenseList}
            setExpenseList={setExpenseList}
          />
          <BarChartComp data={categroyCounts} />
        </div>
        <AddExpenseDialog
          isOpen={isOpenExpense}
          onClose={() => setIsOpenExpense(false)}
        />
        <AddBalanceDialog
          isOpen={isOpenBalance}
          onClose={() => setIsOpenBalance(false)}
        />
      </div>
    </>
  );
};
export default Home;
