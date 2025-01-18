import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Convert from "../../functions/FormatCurrncy";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import { useAuth } from "../Context/AuthContext";
import NavHomeAcc from "../nav/navHomeAcc";
import NavHome from "../nav/NavHome";

const CategoryProducts = () => {
  const [catProducts, setCatProducts] = useState([]); // حالة لتخزين المنتجات
  const { productCategory } = useParams(); // استرجاع الفئة من URL
  const { IsLogin } = useAuth();
  const {
    renderStars,
    CateProducts,
    AddCart,
    RemoveCart,
    IsAdded,
  } = useCart();
  const { AddFavorite, RemoveFavorite, IsAddedFav } = useFavorite();
  const [selectedColors, setSelectedColors] = useState({});

  // تحديث المنتجات بناءً على الفئة
  useEffect(() => {
    const products = CateProducts(productCategory); // استرجاع المنتجات بناءً على الفئة
    setCatProducts(products || []); // تحديث حالة المنتجات
  }, [productCategory, CateProducts]);

  const selectColor = (category, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [category]: color,
    }));
  };

  // إذا لم يتم العثور على أي منتجات
  if (!catProducts || catProducts.length === 0) {
    return (
      <section id="CategoryProducts">
        <p className="text-center">No products found in this category.</p>
      </section>
    );
  }

  return (
    <>
      {IsLogin ? <NavHomeAcc /> : <NavHome />}
      <section id="CategoryProducts">
        <Container>
          <h1 className="mt-5">{productCategory}</h1>
          <Row>
            {catProducts.map((catProduct) => (
              <Col lg={3} md={6} sm={12} key={catProduct.id}>
                <div className="product">
                  <div className="product-top d-flex justify-content-between">
                    <img src={catProduct.image} alt={catProduct.name} />
                    <span></span>
                    <div className="icons">
                      {IsAddedFav(catProduct) ? (
                        <i
                          className="fa-regular fa-heart active"
                          onClick={() => RemoveFavorite(catProduct)}
                        ></i>
                      ) : (
                        <i
                          className="fa-regular fa-heart"
                          onClick={() => AddFavorite(catProduct)}
                        ></i>
                      )}
                      <Link to={`/Description/${catProduct.id}`}>
                        <i className="fa-regular fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                  {IsAdded(catProduct) ? (
                    <div
                      onClick={() => RemoveCart(catProduct)}
                      className="RemoveCart"
                    >
                      <p>Remove from Cart</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => AddCart(catProduct)}
                      className="addCart"
                    >
                      <p>Add To Cart</p>
                    </div>
                  )}
                  <div className="product-des">
                    <p className="product-title">{catProduct.name}</p>
                    <div className="price d-flex">
                      <p className="curr-price">
                        {Convert(catProduct.new_price)}
                      </p>
                      {typeof catProduct.old_price === "number" && (
                        <p className="prev-price">
                          {Convert(catProduct.old_price)}
                        </p>
                      )}
                    </div>
                    <div className="star-ctn d-flex">
                      {renderStars(catProduct.stars)}
                      <span className="reviews ms-2">
                        ({catProduct.reviews || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CategoryProducts;
