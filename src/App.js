import { Routes, Route, Navigate } from "react-router-dom";
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
import CustomerOrderView from "./components/CustomerOrderView";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />

      <HeaderComp />
      <MainBody />

      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="registrationsuccess" element={<RegistrationSuccess />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/verifyToken" element={<VerifyToken />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <MainBody />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="productList"
            element={
              <PrivateRoute>
                {" "}
                <CustomerProductList />
              </PrivateRoute>
            }
          />
          <Route path="customerOrderView" element={<CustomerOrderView />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
