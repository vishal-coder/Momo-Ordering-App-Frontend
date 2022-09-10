import React, { useState } from "react";
import "../components/css/cart.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { TrashFill } from "react-bootstrap-icons";
import { removeItem } from "../features/cartSlice";
import { toast } from "react-toastify";
import { saveOrder } from "../services/orderService";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart) || [];
  const { total } = useSelector((state) => state.cart) || [];
  const { user } = useSelector((state) => state.auth);

  const handleCheckout = () => {
    console.log();
    saveOrder({ cart: cart, total: total, user: user.user.email });
  };

  return (
    <div className="cartWrapper">
      {cart.length > 0 ? (
        <>
          <div className="orderlist">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Details</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(
                  (item, index) => (
                    console.log(item),
                    (
                      <tr key={item.product._id}>
                        <td>{index + 1}</td>
                        <td>{item.product.title}</td>
                        <td>Rs. {item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td style={{ fontWeight: "bold" }}>
                          Rs.{" "}
                          {Number(item.quantity) * Number(item.product.price)}
                        </td>
                        <td>
                          {" "}
                          <TrashFill
                            className="additionalIcon"
                            color="red"
                            style={{ marginLeft: "2rem" }}
                            onClick={() => dispatch(removeItem(item))}
                          />
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </Table>
          </div>
          <div className="cartoverview">
            <div style={{ fontSize: "24px" }}>Cart Total</div>
            <div>Subtotal : Rs. {total}</div>
            <div>Discount : Rs. 00</div>
            <div>Total : Rs. {total}</div>
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  handleCheckout();
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        (navigate("/productList"),
        toast.error("Cart is empty..Please select product"))
      )}
    </div>
  );
}

export default Cart;
