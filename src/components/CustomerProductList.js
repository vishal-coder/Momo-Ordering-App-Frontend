import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../components/css/customerpages.css";
import { getAllProducts } from "../services/productservice";
import ProductCard from "./ProductCard";

function CustomerProductList() {
  const [productList, setProductList] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await getAllProducts();
      setProductList(response.productlist);
    }
    fetchData();
  }, []);

  return (
    <div className="productlistwrapper">
      {!productList ? (
        <p>Loading Product list...</p>
      ) : (
        <>
          {/* <h3>Select any delicious product</h3> */}
          {productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </>
      )}
    </div>
  );
}

export default CustomerProductList;
