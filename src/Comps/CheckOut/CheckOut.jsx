import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router";
import Convert from "../../functions/FormatCurrncy";

import "./CheckOut.css";
const CheckOut = () => {
  const { Cart, totalPrice } = useCart(); // Use Cart from context

  // State to keep track of selected payment method
  const [selectedPayment, setSelectedPayment] = useState("");

  // Handle radio button change
  const handleChange = (e) => {
    setSelectedPayment(e.target.value);
  };
  return (
    <section id="CheckOut">
      <Container>
        <p className="Path">
          Home / Cart / <span className="text-dark">CheckOut</span>
        </p>
        <h1 className="mb-5">Billing Details</h1>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="left">
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>
                  First Name <span className="text-danger">*</span>
                </p>
                <input type="text" />
              </div>
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>Company Name </p>
                <input type="text" />
              </div>
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>
                  Street Address <span className="text-danger">*</span>
                </p>
                <input type="text" />
              </div>
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>Apartment, floor, etc. (optional)</p>
                <input type="text" />
              </div>
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>
                  Town/City <span className="text-danger">*</span>
                </p>
                <input type="text" />
              </div>
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>
                  Phone Number <span className="text-danger">*</span>{" "}
                </p>
                <input type="text" />
              </div>
              <div className="inp-filed" style={{ marginBottom: "1.6rem" }}>
                <p>
                  Email Address <span className="text-danger">*</span>{" "}
                </p>
                <input type="text" />
              </div>
              <input type="checkbox" className="check" />
              <label className="ms-2">
                Save this information for faster check-out next time
              </label>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="right">
              <div className="right-top">
                <div className="right-cart">
                  {Cart.map((cartItem) => (
                    <div className="cart-products d-flex justify-content-between mb-4">
                      <div
                        className="photo d-flex"
                        style={{ margin: "auto 0" }}
                      >
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          className="cartItem-image"
                        />
                        <h6 style={{ margin: "auto 0" }}>
                          {cartItem.name.split(" ").slice(0, 2).join(" ")}
                        </h6>
                      </div>
                      <p>{Convert(cartItem.new_price * cartItem.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="right-price">
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
                </div>
                <div className="pay d-flex justify-content-between">
                  <form>
                    <div className="bank">
                      <input
                        type="radio"
                        id="bank"
                        name="payment"
                        value="Bank"
                        checked={selectedPayment === "Bank"}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="bank"
                        className="ms-3"
                        style={{ fontSize: "18px" }}
                      >
                        Bank
                      </label>
                    </div>
                    <div className="cash mt-4">
                      <input
                        type="radio"
                        id="cash"
                        name="payment"
                        value="Cash on delivery"
                        checked={selectedPayment === "Cash on delivery"}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="cash"
                        className="ms-3"
                        style={{ fontSize: "18px" }}
                      >
                        Cash on delivery
                      </label>
                    </div>
                  </form>
                  <div className="photos d-flex">
                    <img src="/images/appstore.png" alt="Payment method" />
                    <img src="/images/googleapp.png" alt="Payment method" />
                    <img src="/images/QR.jpg" alt="Payment method" />
                    <img src="/images/download.png" alt="Payment method" />
                  </div>
                </div>
              </div>
              <div className="Coupon mt-3">
                <input type="text" placeholder="Coupon Code" />
                <button className="Apply">Apply Coupon</button>
              </div>
              <Link to='/Error'>
              <button className="Order mt-3" style={{ marginLeft: "0rem" }}>
                Place Order
              </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CheckOut;
