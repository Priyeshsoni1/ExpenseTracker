import React, { PureComponent } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const BarChartComp = ({ data }) => {
  const fitData = Object.entries(data).map((item) => {
    return { name: item[0], amt: item[1] };
  });
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Top Expenses</h2>
      <ResponsiveContainer style={styles.chart}>
        <BarChart data={fitData} layout="vertical" barSize={20}>
          <XAxis type="number" axisLine={false} display={"none"} />
          <YAxis dataKey="name" type="category" axisLine={false} />

          <Bar dataKey="amt" fill="#8884d8" style={{ height: "1px" }} />
        </BarChart>
      </ResponsiveContainer>{" "}
    </div>
  );
};

export default BarChartComp;

const styles = {
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
  container: {
    width: "90%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",

    alignItems: "flex-start",
  },
  chart: {
    width: "100%",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
};
