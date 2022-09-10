import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { getAllOrders, updateOrderStatus } from "../services/orderService";
import { toast } from "react-toastify";

function OrdersPage() {
  const status = ["yet to start", "preparing", "on the way", "delivered"];
  const [orders, setOrders] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await getAllOrders();
      setOrders(response.orderlist);
    }
    fetchData();
  }, []);
  const handleupdateOrderStatus = (order) => {
    updateOrderStatus({ id: order._id, status: order.status + 1 });
    order.status = order.status + 1;
    toast.success("status updated successfully");
    const updatedList = orders.map((item) => {
      return item._id == order._id ? order : item;
    });
    setOrders(updatedList);
  };
  return (
    <div className="Productlistwrapper">
      {!orders ? (
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
              {orders.map((order, index) => (
                // {order.status != 3 ?() : null}
                <tr
                  key={order._id + index}
                  className={order.status == 3 ? "hideEle" : null}
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
