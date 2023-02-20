
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./components/Loader";
import PublicRoute from "./components/PublicRoute";
function App() {
  const authChecked = useAuthCheck();
  return (
    authChecked ? 
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute> } />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
      <ToastContainer />
    </Router>
    : <Loader/>
  );
}

export default App;
