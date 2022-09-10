import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
function OrdersPage() {
  const status = ["yet to start", "preparing", "on the way", "delivered"];
  const orderList = [{ 1: 1, 1: 1, 1: 1, 1: 1, 1: 1, 1: 1, status: 1 }];

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
                <th>Order Details</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.title}</td>
                  <td>{order.description}</td>
                  <td>{order.price}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <Button variant="success">Next Stage</Button>{" "}
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
