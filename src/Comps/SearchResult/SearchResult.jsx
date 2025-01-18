import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import Convert from "../../functions/FormatCurrncy";
import NavHomeAcc from "../nav/navHomeAcc";
import { Link } from "react-router-dom";

const SearchResult = () => {
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
  const { productIdentifier } = useParams();
  const [selectedColors, setSelectedColors] = useState({});
  const { AddFavorite, RemoveFavorite, IsAddedFav } = useFavorite();

  const selectColor = (productId, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color,
    }));
  };

  // Fetch products by name
  const products = desProductByName(productIdentifier);

  return (
    <section id="SearchResult">
      <NavHomeAcc />
      <section id="CategoryProducts">
        <Container>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col lg={3} md={6} sm={12} key={product.id}>
                  <div className="product">
                    <div className="product-top d-flex justify-content-between">
                      <img src={product.image} alt={product.name} />
                      <span></span>
                      <div className="icons">
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
                        <Link to={`/Description/${product.id}`}>
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                      </div>
                    </div>
                    {IsAdded(product) ? (
                      <div
                        onClick={() => RemoveCart(product)}
                        className="RemoveCart"
                      >
                        <p>Remove from Cart</p>
                      </div>
                    ) : (
                      <div onClick={() => AddCart(product)} className="addCart">
                        <p>Add To Cart</p>
                      </div>
                    )}
                    <div className="product-des">
                      <p className="product-title">{product.name}</p>
                      <div className="price d-flex">
                        <p className="curr-price">{Convert(product.new_price)}</p>
                        {typeof product.old_price === "number" && (
                          <p className="prev-price">{Convert(product.old_price)}</p>
                        )}
                      </div>
                      <div className="star-ctn d-flex">
                        {renderStars(product.stars)}
                        <span className="reviews ms-2">({product.reviews || 0})</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div>No products found matching "{productIdentifier}"</div>
            )}
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default SearchResult;
