import { React, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import Convert from "../../functions/FormatCurrncy";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

import "./Cart.css";

const Cart = () => {
  const { increaseProduct, decreaseProduct, totalPrice, Cart, RemoveCart } =
    useCart(); // Use Cart from context
  return (
    <section id="Cart">
      <Container>
        <p className="Path">
          Home / <span className="text-dark">Cart</span>
        </p>
        <div className="cart-top text-center">
          <Row>
            <Col lg={3} md={3} sm={3}>
              <p>Product</p>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <p>Price</p>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <p>Quantity</p>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <p>Subtotal</p>
            </Col>
          </Row>
        </div>
        {Cart.map((cartItem) =>
          cartItem.quantity === 0 ? (
            // If the quantity is zero, remove the item from the cart and from localStorage
            window.localStorage.removeItem(cartItem) // Remove from localStorage
          ) : (
            <div className="cartItem text-center" key={cartItem.id}>
              <Row>
                <Col lg={3} md={3} sm={3}>
                  <div className="left d-flex ms-3" style={{ height: "100%" }}>
                    <div className="photo d-flex" style={{ margin: "auto 0" }}>
                      <span
                        className="Close"
                        onClick={() => RemoveCart(cartItem)}
                      >
                        X
                      </span>
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="cartItem-image"
                      />
                    </div>
                    <h6 style={{ margin: "auto 0" }}>
                      {cartItem.name.split(" ").slice(0, 2).join(" ")}
                    </h6>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <p>{Convert(cartItem.new_price)}</p>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <div
                    className="cartItem-quantity"
                    style={{ alignContent: "center", height: "100%" }}
                  >
                    <div className="btns">
                      <button onClick={() => increaseProduct(cartItem)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      {cartItem.quantity === 1 ? (
                        <button
                          disabled
                          onClick={() => decreaseProduct(cartItem)}
                        >
                          <i className="fa-solid fa-angle-down"></i>
                        </button>
                      ) : (
                        <button onClick={() => decreaseProduct(cartItem)}>
                          <i className="fa-solid fa-angle-down"></i>
                        </button>
                      )}
                    </div>
                    <input
                      className="quantity"
                      type="number"
                      readOnly
                      value={String(cartItem.quantity).padStart(2, "0")}
                    />
                  </div>
                </Col>
                <Col lg={3} md={6} sm={6}>
                  <p>{Convert(cartItem.new_price * cartItem.quantity)}</p>
                </Col>
              </Row>
            </div>
          )
        )}
        <div className="btns d-flex justify-content-between">
          <Link to='/HomeAcc'>
          <button className="Return">Return To Shop</button>
          </Link>
          <button className="Update">Update Cart</button>
        </div>
        <div className="cart-bottom mt-5">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="left">
                <input type="text" placeholder="Coupon Code" />
                <button className="Apply">Apply Coupon</button>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} style={{ justifyItems: "end" }}>
              <div className="right">
                <h5 className="mb-3">Cart Total</h5>
                <div
                  className="Subtotal d-flex justify-content-between"
                  style={{ marginBottom: "-1rem" }}
                >
                  <p>Subtotal:</p>
                  <p>{Convert(totalPrice)}</p>
                </div>
                <hr />
                <div
                  className="Shipping d-flex justify-content-between"
                  style={{ marginBottom: "-1rem" }}
                >
                  <p>Shipping:</p>
                  <p>free</p>
                </div>
                <hr />
                <div
                  className="Total: d-flex justify-content-between"
                  style={{ marginBottom: "-1rem" }}
                >
                  <p>Total::</p>
                  <p>{Convert(totalPrice)}</p>
                </div>
                <hr />
                <div className="bottom-btn text-center">
                  <Link to={"/Cart/CheckOut"}>
                    <button className="checkout">Process to checkout</button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
