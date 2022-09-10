import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import itemImg from "../components/momo.jpg";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="cardwrapper">
      {" "}
      <Card style={{ width: "18rem" }}>
        <Card.Img
          classname="momoImg"
          variant="top"
          src={itemImg}
          height={80}
          width={50}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Rs.{product.price}</ListGroup.Item>
          </ListGroup>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addToCart({
                  product,
                })
              );
              toast.success("Item added to cart Successfully");
            }}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
