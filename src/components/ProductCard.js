import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import itemImg from "../components/momo.jpg";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="cardwrapper">
      {" "}
      <Card style={{ width: "18rem" }}>
        <Card.Img
          className="momoImg"
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
          {user && user.user.userType != "admin" ? (
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
          ) : null}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
