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
                    <img
                      src="https://s3-alpha-sig.figma.com/img/bacb/ff99/a8fc8e50822cb2d2d168e5d0e8bf7ea6?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QRTYKSiAu7op39LEyVqihYwCN1RUi3KlrStiqiZ5TChpwEB9zsH9dXsgBiIwvOaxkdHVwEb1XCWPbiwNW6i-BJVchKu3cFHtjHsUzFLhMj4fEc9uBvS~hOukcn9fpGSjybVkK5KR1DHNRd-9wpIQhYWZzlGgRPTOuxLFhGeaIeoH9j0hoRryJReIiihOjxkWPGvDd9m1f6FXuaLlL1Hx5lBGRFv7keRwG0kl-mlcF6EEdkyf9~JQ~9yT8zqI3m1J9lAhdhcxP-oseFQXXEYs-7l-pvIDHhKLjfgPVfQNEwNdKLr6dpPrSkgKc1PrVdoywxwWtcaILy14U0Gi6YRhrA__"
                      alt=""
                    />
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cfb0/a6ee/01b240273b40dab07f8246ef98aed88a?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jdob1WlaWUqRnDFAW4EkAPFcC6Zq-fsDb2MnZ7z9AnomyqBhxKj0WvlcGWVC~JUFBUC8IibaW~5g-n6aTutYNJEgUiz1lBgfNiuNZJblPB4PwNmCvps8nBSW943Ny8EXuHhzz2opdzBjW1etOKS1PP~om1WhrNpeRRPYnvPkDqaOM5z5vluAEOxMQXQ-J8aE9FZUFryBKCC9A8nVeLJTGnlshXFK3hysOxnS4-ZPHCnvIxoPm0dwhGUnnG-Ov9TTzQn9HBJHrDUusLDNnXWxpW~pxkgBO4icJNAs9BhOF4z~G~63GN~CXKDx3wHiA-IsHXnrAgcv39fuJN7BioeSQQ__"
                      alt=""
                    />
                    <img
                      src="https://s3-alpha-sig.figma.com/img/6eef/b61d/27c754abac218d25d8ea4360de61f8e8?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IduATsfXtIJV7hNZqgatQ-pDcH7IjPJjKE3fE2wFnDrUQlnIxQJjHd9maqZ27ggn3B~~B23RnVvd-W6DW3oai5E6MjiA-kcAHn4GqQpZrI4QRmb5kTXgUtyv97qj4mAhKA-0sHQecvKJYCNt~bJhUnB7vwC0Idu8--pz7EDVgbuGxvv4PxFtCRo3G4pGkph8eHjIbXyma1JO4c8vng3K3VSKg5akL-QMX6rKZIMVqPVuI-9MDVsp3ytSMzsk-Hlfawht36xVFdr3lJ~lPtUoJeSWQlfaX~jSBziAwUBDotKXguu5lyG5fVJmINJYIeUkHdnYlH7x4pz9uz-p1iKAtw__"
                      alt=""
                    />
                    <img
                      src="https://s3-alpha-sig.figma.com/img/b28e/31b9/c88d0c9b038b82deeb0523d82cffe267?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bCm-C536jt5Rv7WgjuBQp736RH~rLJD3QskN7Q~6HAtcVaQ3jB8jJseWQB9NABZlAkaKpJ9bO5qol6ae52VRfgYy8FRGzenZQKOnC4Vc9o-IxWLCF3nmYYH1nT3xLbnnGrRm0x5KIW2mjvluqb-AbyNzRePp3rQhh~S-OG0JnG9-stlAtjBCwj6qMNDHuLE7Yqzf4AlaNqhlAyOZMb-HG6Nl8oT8PntR8GFegbbHAUCA35Qh-JSDntGc6u8~sGCrmd0~187O7DSOoeSSMt1P6XtzbNZppEcz8V--ijcfDZ5zbciaHuXHNKRCRq~dB5nnB78MamZgFaajMwnHmtx-pw__"
                      alt=""
                    />
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
