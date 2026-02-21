import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./Helper/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <AppRoutes/>
    </>
  );
};

export default App;
