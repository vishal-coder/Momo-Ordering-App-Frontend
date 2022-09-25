import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../features/cartSlice";
import { getCustomerOrders } from "../services/orderService";

import { toast } from "react-toastify";
import { SocketContext } from "../context/socket";

function CustomerOrderView() {
  const dispatch = useDispatch();
  const status = ["yet to start", "preparing", "on the way", "delivered"];
  const [orders, setOrders] = useState();
  const { user } = useSelector((state) => state.auth);
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(resetCart());
    async function fetchData() {
      const response = await getCustomerOrders(
        { user: user.user.email },
        user.token
      );
      setOrders(response.customerOrders);
    }
    fetchData();
    socket.on("connect", () => {});
    socket.emit("new user", user.user.email);
  }, []);

  useEffect(() => {
    socket.on("order updated", function (updatedOrder) {
      updateOrderList(updatedOrder);
    });
    return () => {
      // socket.off("connect");
      socket.off("order updated");
    };
  }, [socket]);
  const updateOrderList = (updatedOrder) => {
    const id = updatedOrder.documentKey;
    const newStatus = updatedOrder.updateDescription.updatedFields.status;
    toast.success("Order status updated");
    setOrders((prev) => {
      const orderUpdated = prev.find((item) => {
        return item._id == id._id;
      });
      orderUpdated.status = newStatus;
      const editedList = prev.map(function (order) {
        return order._id == id._id ? orderUpdated : order;
      });
      return editedList;
    });
  };

  function formatDate1(d) {
    const date = new Date(d);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return (d = dd + "-" + mm + "-" + yyyy + " " + hr + ":" + min + ":" + sec);
  }
  return (
    <div className="customerorderlist">
      <h3>View your curent order here</h3>
      <hr />
      {orders ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Order id</th>
              <th>Order On</th>
              <th>Price</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id + index}>
                <td>{index + 1}</td>
                <td>{order._id.slice(15)}</td>
                <td>{formatDate1(order.createdOn)}</td>
                <td>
                  {order.cart.reduce(function (accumulator, item) {
                    return (
                      accumulator +
                      item.product.title +
                      " - " +
                      item.quantity +
                      ", "
                    );
                  }, "")}
                </td>

                <td>Rs.{order.total}</td>
                <td>Done</td>

                <td className={order.status != "0" ? "" : "warningText"}>
                  {status[order.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
}

export default CustomerOrderView;
