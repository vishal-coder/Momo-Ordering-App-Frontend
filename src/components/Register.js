import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./css/register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
import { submitRegistration } from "../services/authService";
function Register() {
  const navigate = useNavigate();
  const formvalidation = yup.object({
    firstname: string().required().min(2),
    lastname: string().required().min(2),
    phone: string().required().min(10),
    username: string().email().required(),
    address: string().required().min(30),
    password: string().required().min(6),
  });

  const {
    formik,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
      address: "",
      password: "",
    },
    validationSchema: formvalidation,
    onSubmit: async (values) => {
      const response = await submitRegistration(values);
      if (!response.success) {
        setFieldError("firstname", response.message);
      } else {
        navigate("/registrationsuccess");
      }
    },
  });

  return (
    <div className="registerwrapper">
      <h3>Register to use our services</h3>
      <Form onSubmit={handleSubmit}>
        {touched.firstname && errors.firstname ? (
          <div className="error">{errors.firstname}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formfirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.lastname && errors.lastname ? (
          <div className="error">{errors.lastname}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.phone && errors.phone ? (
          <div className="error">{errors.phone}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.username && errors.username ? (
          <div className="error">{errors.username}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.address && errors.address ? (
          <div className="error">{errors.address}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="address">
          <Form.Label> address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
        <Button
          variant="primary"
          style={{ backgroundColor: "#00005c" }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
