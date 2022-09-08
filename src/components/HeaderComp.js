import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import { Cart4 } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function HeaderComp() {
  const navigate = useNavigate();
  return (
    <Navbar className="header">
      <Container>
        <Navbar.Brand>Momo King</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Features</Nav.Link>
          <Nav.Link>Pricing</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => navigate("register")}>Register</Nav.Link>
            <Nav.Link onClick={() => navigate("login")}>Login</Nav.Link>

            <Navbar.Text>Welcome, Mark Otto</Navbar.Text>
            <Nav.Link>Logout</Nav.Link>
          </Nav>
          <Button variant="success">
            <Cart4 className="cartIcon" color="white" size={24} />{" "}
            <Badge bg="danger">9</Badge>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComp;
