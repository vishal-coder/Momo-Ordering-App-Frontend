import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { string, number } from "yup";
import { useNavigate } from "react-router-dom";
import { addProduct, editOneProduct } from "../services/productservice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditedProduct,
  addNewProduct,
  addProductToList,
} from "../features/productSlice.js";
function EditProduct({ product, setShow }) {
  const dispatch = useDispatch();

  const formvalidation = yup.object({
    title: string().required("Enter title of product").min(4),
    description: string().required("Enter description of product").min(10),
    price: string().required("Enter Momo price").min(2).max(4),
  });

  const insertProduct = async (values) => {
    values._id = product._id;
    const response = await editOneProduct(values);
    if (!response.success) {
      setFieldError("title", response.message);
      toast.error("Error while editing product");
    } else {
      const updatedProduct = {
        _id: product._id,
        title: values.title,
        description: values.description,
        price: values.price,
      };
      dispatch(addEditedProduct(updatedProduct));
      setShow(false);
      toast.success("Product edited successfully");
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
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
    },
    validationSchema: formvalidation,
    onSubmit: (values) => {
      insertProduct(values);
    },
  });

  return (
    <div className="">
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

        <Button variant="primary" type="submit" style={{ textAlign: "center" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditProduct;
