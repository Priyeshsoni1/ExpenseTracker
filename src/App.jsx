import React from "react";

import { SnackbarProvider } from "notistack";
import Home from "./features/expenseTracker/pages/Home";

export const App = () => {
  return (
    <div>
      <SnackbarProvider>
        <Home />
      </SnackbarProvider>
    </div>
  );
};
