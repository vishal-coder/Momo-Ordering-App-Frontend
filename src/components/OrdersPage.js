import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { getAllOrders, updateOrderStatus } from "../services/orderService";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { SocketContext } from "../context/socket.js";
import { useSelector } from "react-redux";

function OrdersPage() {
  const status = ["yet to start", "preparing", "on the way", "delivered"];
  const [orderList, setOrderList] = useState();
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllOrders(user.token);
      setOrderList(response.orderlist);
    }
    fetchData();
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("I'm connected with the back-end", socket.id);
    });

    socket.off("order created").on("order created", function (newOrder) {
      setOrderList((prev) => [...prev, newOrder.fullDocument]);
      toast.success("New Order added");
    });

    return () => {
      // socket.off("connect");
      socket.off("order created");
    };
  }, [socket]);

  const handleupdateOrderStatus = (order) => {
    updateOrderStatus({ id: order._id, status: order.status + 1 }, user.token);
    order.status = order.status + 1;
    toast.success("status updated successfully");
    const updatedList = orderList.map((item) => {
      return item._id == order._id ? order : item;
    });
    setOrderList(updatedList);
  };
  return (
    <div className="Productlistwrapper">
      {!orderList ? (
        <>
          {" "}
          <p>No pending orders </p>{" "}
        </>
      ) : (
        <>
          <h3>Pending orders</h3>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order id</th>
                <th>Customer</th>
                <th>Order Details</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, index) => (
                // {order.status != 3 ?() : null}
                <tr
                  key={order._id + index}
                  // className={order.status == 3 ? "hideEle" : null}
                >
                  <td>{index + 1}</td>
                  <td>{order._id.slice(15)}</td>
                  <td>{order.user}</td>
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

                  <td>{order.total}</td>
                  {/* <td>{order.cart.product.price}</td> */}
                  <td className={order.status != "0" ? "" : "warningText"}>
                    {
                      status[order.status]
                      // console.log("order.status", order.status))
                    }
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleupdateOrderStatus(order)}
                      disabled={order.status == 3 ? true : false}
                    >
                      Next Stage
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
