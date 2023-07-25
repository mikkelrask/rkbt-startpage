import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Tolgee, DevTools, TolgeeProvider, FormatSimple } from "@tolgee/react";

// Access environment variables using import.meta.env
const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    language: "da-dk",
    apiUrl: import.meta.env.REACT_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.REACT_APP_TOLGEE_API_KEY,
    staticData: {},
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TolgeeProvider tolgee={tolgee} fallback="Loading...">
      <App />
    </TolgeeProvider>
  </React.StrictMode>
);
