import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productservice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "../features/productSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditProduct from "./EditProduct";

function ProductList() {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);
  const { productList } = useSelector((state) => state.product);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   const getProductList = async () => {
  //     const response = await getProducts();
  //     setProductList(response.productlist);
  //     console.log(productList);
  //   };
  useEffect(() => {
    async function fetchData() {
      //   getProductList();
      const response = await getProducts();
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
    const response = await deleteProduct({ id: id });
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
                  <tr key={product.id}>
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
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
