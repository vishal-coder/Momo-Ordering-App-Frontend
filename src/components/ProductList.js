import React, { useEffect, useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setProductList } from "../features/productSlice";
import { deleteProduct, getAllProducts } from "../services/productservice";
import EditProduct from "./EditProduct";

function ProductList() {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  const { productList } = useSelector((state) => state.product);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllProducts(user.token);
      dispatch(setProductList(response.productlist));
    }
    fetchData();
  }, []);
  const handleEdit = (id) => {
    const product = productList.find((item) => {
      return item._id == id;
    });
    setEditProduct(product);
    handleShow();
  };
  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct({ id: id }, user.token);
    if (!response.success) {
      toast.error("Error while deleting product");
    } else {
      const newList = productList.filter((item) => {
        return item._id !== id;
      });
      dispatch(setProductList(newList));
      toast.success("Product deleted successfully");
    }
  };
  return (
    <div>
      <div className="Productlistwrapper">
        {!productList ? (
          <>
            {" "}
            <p>Loading Product list...</p>{" "}
          </>
        ) : (
          <>
            <h3>Product list</h3>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={product.id + index}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <PencilFill
                        color="blue"
                        className="additionalIcon"
                        // onClick={() => navigate(`/editStudent/${student.id}`)}
                        onClick={() => handleEdit(product._id)}
                      />
                      <TrashFill
                        className="additionalIcon"
                        color="red"
                        style={{ marginLeft: "2rem" }}
                        onClick={() => handleDeleteProduct(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-50w">
              <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProduct product={editProduct} setShow={setShow} />
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
