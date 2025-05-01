import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App";
import { ApiProvider } from "./contexts/ApiProvider";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <ApiProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </ApiProvider>
    <ToastContainer />
  </React.StrictMode>,
);
