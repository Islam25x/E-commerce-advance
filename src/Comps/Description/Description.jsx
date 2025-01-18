import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import Convert from "../../functions/FormatCurrncy";

import "./Description.css";
const Description = () => {
  const {
    increaseProduct,
    decreaseProduct,
    renderStars,
    desProduct,
    AddCart,
    Cart,
    RemoveCart,
    isNumeric,
    desProductByName,
    IsAdded,
  } = useCart();
  const { productId } = useParams();
  // Product Color
  const [selectedColors, setSelectedColors] = useState({});
  const { AddFavorite, RemoveFavorite, IsAddedFav } = useFavorite();

  const selectColor = (productId, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color,
    }));
  };

  const product = desProduct(parseInt(productId)) // Fetch product by ID
  

  console.log(product);
  const cartProduct = Cart.find((cartItem) => cartItem.id === product.id);
  const quantity = cartProduct ? cartProduct.quantity : 0; // If product exists in Cart, use its quantity; else 0

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section id="product-description">
      <Container>
        <p className="Path">
          Account / {product.category} /{" "}
          <span className="text-dark">{product.name}</span>
        </p>
        <Row>
          <Col lg={2} md={2} sm={4}>
            <div className="Album">
              <div className="photo photo1">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="photo photo2">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="photo photo3">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="photo photo4">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
          </Col>
          <Col lg={5} md={5} sm={8}>
            <div className="center-photo">
              <img src={product.image} alt={product.name} />
            </div>
          </Col>
          <Col lg={5} md={5} sm={8}>
            <div className="product-content" style={{ marginTop: "1rem" }}>
              <h3>{product.name}</h3>
              <div className="star-ctn d-flex">
                {renderStars(product.stars)}
                <span className="count ms-2">({product.count || 0})</span>
                {product.InStock ? (
                  <span className="count ms-2" style={{ color: "green" }}>
                    {" "}
                    | In Stock
                  </span>
                ) : (
                  <span className="count ms-2" style={{ color: "red" }}>
                    {" "}
                    | Out of Stock
                  </span>
                )}
              </div>
              <h3 className="mt-3">{Convert(product.new_price)}</h3>
              <p className="description mt-3">{product.description}</p>
              <hr />
              <div className="Colors d-flex">
                <h6>Colors:</h6>
                {product.color1 !== "" ? (
                  <>
                    <span
                      onClick={() => selectColor(product.id, product.color1)}
                      style={{ backgroundColor: product.color1 }}
                      className={
                        selectedColors[product.id] === product.color1
                          ? "active"
                          : ""
                      }
                    ></span>
                    <span
                      onClick={() => selectColor(product.id, product.color2)}
                      style={{ backgroundColor: product.color2 }}
                      className={
                        selectedColors[product.id] === product.color2
                          ? "active"
                          : ""
                      }
                    ></span>
                  </>
                ) : (
                  <div className="ms-3">No colors</div>
                )}
                <span
                  onClick={() => selectColor(product.id, product.color1)}
                  style={{ backgroundColor: product.color1 }}
                  className={
                    selectedColors[product.id] === product.color1
                      ? "active"
                      : ""
                  }
                ></span>
                <span
                  onClick={() => selectColor(product.id, product.color2)}
                  style={{ backgroundColor: product.color2 }}
                  className={
                    selectedColors[product.id] === product.color2
                      ? "active"
                      : ""
                  }
                ></span>
              </div>
              <div className="size d-flex mt-3 mb-2">
                <h6 className="mt-2">Size:</h6>
                <ul className="d-flex" style={{ marginLeft: "-2rem" }}>
                  <li>XS</li>
                  <li>S</li>
                  <li className="active">M</li>
                  <li>L</li>
                  <li>XL</li>
                </ul>
              </div>
              <div className="cart d-flex">
                <div className="count d-flex">
                  {quantity === 1 ? (
                    <button
                      className="minus"
                      disabled
                      onClick={() => decreaseProduct(product)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  ) : (
                    <button
                      className="minus"
                      onClick={() => decreaseProduct(product)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  )}
                  <span>{quantity}</span>
                  <button
                    className="plus"
                    onClick={() => increaseProduct(product)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                {IsAdded(product) ? (
                  <button
                    className="Buy mx-2"
                    style={{ background: "green" }}
                    onClick={() => RemoveCart(product)}
                  >
                    in Cart
                  </button>
                ) : (
                  <button className="Buy mx-2" onClick={() => AddCart(product)}>
                    Buy Now
                  </button>
                )}
                <div className="heart">
                  {IsAddedFav(product) ? (
                    <i
                      className="fa-regular fa-heart active"
                      onClick={() => RemoveFavorite(product)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart"
                      onClick={() => AddFavorite(product)}
                    ></i>
                  )}
                </div>
              </div>
              <div className="des-bottom">
                <div className="first d-flex">
                  <div className="icon">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                  <div className="first-des">
                    <h6>Free Delivery</h6>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="sec d-flex">
                  <div className="icon">
                    <i className="fa-solid fa-rotate"></i>
                  </div>
                  <div className="sec-des">
                    <h6>Return Delivery</h6>
                    <p>
                      Free 30 Days Delivery Returns. <a href="ss">Details</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Description;

