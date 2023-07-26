import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Tolgee, DevTools, TolgeeProvider, FormatSimple } from "@tolgee/react";

const envApiURL = import.meta.env.VITE_REACT_APP_TOLGEE_API_URL as string;
const envApiKey = import.meta.env.VITE_REACT_APP_TOLGEE_API_KEY as string;



// Access environment variables using import.meta.env
const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({

    language: "da-DK",
    apiUrl: envApiURL,
    apiKey: envApiKey,
    
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TolgeeProvider tolgee={tolgee} fallback="Loading...">
      <App />
    </TolgeeProvider>
  </React.StrictMode>
);
