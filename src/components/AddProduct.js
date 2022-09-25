import { useFormik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { string } from "yup";
import { addProduct } from "../services/productservice";
import "./css/register.css";

import { addNewProduct } from "../features/productSlice.js";
function AddProduct() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const formvalidation = yup.object({
    title: string().required("Enter title of product").min(4),
    description: string().required("Enter description of product").min(10),
    price: string().required("Enter Momo price").min(2).max(4),
  });

  const insertProduct = async (values) => {
    const response = await addProduct(values, user.token);

    if (!response.success) {
      setFieldError("title", response.message);
      toast.error("Error while adding product");
    } else {
      resetForm();
      values._id = response.product.insertedId;
      dispatch(addNewProduct(values));
      toast.success("Product added successfully");
    }
  };
  const {
    formik,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: formvalidation,
    onSubmit: (values) => {
      insertProduct(values);
    },
  });

  return (
    <div className="addproductwrapper">
      <h3>Add New Product</h3>
      <Form onSubmit={handleSubmit}>
        {touched.title && errors.title ? (
          <div className="error">{errors.title}</div>
        ) : (
          ""
        )}

        <Form.Group as={Row} className="mb-3" controlId="formtitle">
          <Form.Label column sm={4}>
            Title
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Product Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>
        {touched.description && errors.description ? (
          <div className="error">{errors.description}</div>
        ) : (
          ""
        )}

        <Form.Group as={Row} className="mb-3" controlId="description">
          <Form.Label column sm={4}>
            Product Description
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="textarea"
              placeholder="Product Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        {touched.price && errors.price ? (
          <div className="error">{errors.price}</div>
        ) : (
          ""
        )}

        <Form.Group as={Row} className="mb-3" controlId="price">
          <Form.Label column sm={4}>
            Momo Price
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Enter price of momos"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
