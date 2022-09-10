import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword.js";
import HeaderComp from "./components/HeaderComp.js";
import Login from "./components/Login";
import MainBody from "./components/MainBody";
import Register from "./components/Register";
import RegistrationSuccess from "./components/RegistrationSuccess";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import VerifyToken from "./components/VerifyToken";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import CustomerProductList from "./components/CustomerProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />

      <HeaderComp />
      <MainBody />

      <Routes>
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registrationsuccess" element={<RegistrationSuccess />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyToken" element={<VerifyToken />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<MainBody />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/productList" element={<CustomerProductList />} />

          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
