import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from "yup";
import "./css/login.css";
import { requestLogin } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../features/auth/authSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    const response = await requestLogin(values);

    if (!response.success) {
      setFieldError("username", response.message);
    } else {
      dispatch(setUser(response));
      if (response.user.userType != "admin") {
        navigate("/user/productList");
      } else {
        navigate("/user/dashboard");
      }
    }
  };
  const loginvalidationschema = yup.object({
    username: yup.string().email().required("Please enter valid email address"),
    password: yup.string().required("please enter your password"),
  });

  const {
    formik,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
  } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginvalidationschema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div className="loginwrapper">
      <h3>Login</h3>
      {touched.username && errors.username ? (
        <div className="error">{errors.username}</div>
      ) : (
        ""
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />{" "}
        </Form.Group>
        {touched.password && errors.password ? (
          <div className="error">{errors.password}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        <div className="loginbtn-grp">
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => navigate("/forgotpassword")}
          >
            reset Password
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
