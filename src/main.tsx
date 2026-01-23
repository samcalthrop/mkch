import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { SharedDataProvider } from "./components/SharedDataProvider/SharedDataProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="mkch-ui-theme">
      <SharedDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SharedDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
