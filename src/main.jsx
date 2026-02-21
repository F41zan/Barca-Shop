import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import CardContextProvider from "./component/Context/CardContext.jsx";

createRoot(document.getElementById("root")).render(
  <CardContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CardContextProvider>,
);
