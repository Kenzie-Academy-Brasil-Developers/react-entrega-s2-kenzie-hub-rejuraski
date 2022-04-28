import './App.css';

import Routes from './routes';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes />
    </div>
  );
}

export default App;
