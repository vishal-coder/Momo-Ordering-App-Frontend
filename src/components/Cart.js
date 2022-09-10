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
import { createPaymentOrder } from "../services/paymentService";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart) || [];
  const { total } = useSelector((state) => state.cart) || [];
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [ordres, setOrders] = useState([]); //to set orders

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const handleCheckout = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    try {
      setLoading(true);
      const response = await createPaymentOrder({ amount: total });
      console.log("createPaymentOrder-response", response.orderDate);
      const { amount, id: order_id, currency } = response.orderDate;
      console.log(process.env.REACT_APP_RZ_KEY);
      var options = {
        key: `${process.env.REACT_APP_RZ_KEY}`, // Enter the Key ID generated from the Dashboard
        amount: "100",
        currency: "INR",
        name: "MomoKing",
        description: "Test Transaction",
        order_id: order_id,
        handler: function (response) {
          toast.success("Payment successful");
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    //TODO: after successful payment saveorder
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
                disabled={loading}
              >
                Checkout
              </Button>
              {loading && <div>Loading...</div>}
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
