import React from "react";
import "../components/css/dashboard.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import OrdersPage from "./OrdersPage";

function Dashboard() {
  return (
    <div className="dashboardwrapper">
      <h2>Momo's Dashboard</h2>
      <Tabs
        defaultActiveKey="products"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="add-products" title="Add Product">
          <AddProduct />
        </Tab>
        <Tab eventKey="products" title="Products">
          <ProductList />
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <OrdersPage />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Dashboard;
