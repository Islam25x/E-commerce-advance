import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Convert from "../../../functions/FormatCurrncy";
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router";
import { useFavorite } from "../../Context/FavoriteContext";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
import "swiper/css";
import "swiper/css/navigation";
import "./ExploreProducts.css";

const ExploreProductsAcc = () => {
// Explore Sales
const [products, setProducts] = useState([]);

useEffect(() => {
    const fetchSales = async () => {
    try {
        const response = await axios.get("Assets/all_product.json");
        const Explore = response.data.filter(
        (product) => product.Type === "Explore"
        );
        console.log("Explore fetched:", response.data);
        setProducts(Explore);
    } catch (error) {
        console.error("Error fetching Explore:", error);
    }
    };
    fetchSales();
}, []);

// State for viewAll
const [viewAll, setViewAll] = useState(false);
// stars
const { renderStars, desProduct, AddCart, Cart, RemoveCart, IsAdded } =
    useCart();
const { AddFavorite, RemoveFavorite, IsAddedFav } = useFavorite();

// Reference to the Swiper instance
const swiperRef = useRef(null);

// Handle Next and Prev navigation
const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
};

const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
};
// swiper grid
const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
    }
    return result;
};
const groupedProducts = chunkArray(products, 2);

// Product Color
const [selectedColors, setSelectedColors] = useState({});

const selectColor = (productId, color) => {
    setSelectedColors((prevColors) => ({
    ...prevColors,
    [productId]: color,
    }));
};

return (
    <section id="ExploreProducts">
    <Container>
        <span className="Explore">Our Products</span>
        <div className="left-side d-flex justify-content-between flex-wrap mt-3">
        <h1 className="Today">Explore Our Products</h1>
        {!viewAll ? (
            <div className="swiper-nav-buttons">
            <button onClick={handlePrev} className="swiper-button prev">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={handleNext} className="swiper-button next">
                <i className="fas fa-chevron-right"></i>
            </button>
            </div>
        ) : null}
        </div>
        {!viewAll ? (
        <Swiper
            className="position-relative"
            ref={swiperRef}
            modules={[Navigation]}
            breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1440: { slidesPerView: 4, spaceBetween: 40 },
                }}
            spaceBetween={40}
            slidesPerView={4}
        >
            {groupedProducts.map((group, index) => (
            <SwiperSlide key={index}>
                <div className="product-grid">
                {group.map((item) => (
                    <div className="product" key={item.id}>
                    <div className="product-top d-flex justify-content-between">
                        <img src={item.image} alt={item.name} />
                        {item.salepersent !== "" ? (
                        <span
                            className="sale-persent"
                            style={{ backgroundColor: "#00FF66" }}
                        >
                            {item.salepersent}
                        </span>
                        ) : (
                        <div></div>
                        )}
                        <div className="icons">
                        {IsAddedFav(item) ? (
                            <i
                            className="fa-regular fa-heart active"
                            onClick={() => RemoveFavorite(item)}
                            ></i>
                        ) : (
                            <i
                            className="fa-regular fa-heart"
                            onClick={() => AddFavorite(item)}
                            ></i>
                        )}
                        <Link
                            onClick={() => desProduct(item)}
                            to={`/Description/${item.id}`}
                        >
                            <i className="fa-regular fa-eye"></i>
                        </Link>
                        </div>
                    </div>
                    {IsAdded(item) ? (
                        <div
                        onClick={() => RemoveCart(item)}
                        className="RemoveCart"
                        >
                        <p>Remove from Cart</p>
                        </div>
                    ) : (
                        <div onClick={() => AddCart(item)} className="addCart">
                        <p>Add To Cart</p>
                        </div>
                    )}
                    <div className="product-des">
                        <p className="product-title">{item.name}</p>
                        <div className="price d-flex">
                        <p className="curr-price">
                            {Convert(item.new_price)}
                        </p>
                        <div className="star-ctn d-flex ms-2">
                            {renderStars(item.stars)}
                            <span className="reviews ms-2">
                            ({item.reviews || 0})
                            </span>
                        </div>
                        </div>
                        <div className="product-bottom d-flex">
                        <div className="product-bottom d-flex">
                            <span
                            onClick={() => selectColor(item.id, item.color1)}
                            style={{ backgroundColor: item.color1 }}
                            className={
                                selectedColors[item.id] === item.color1
                                ? "active"
                                : ""
                            }
                            ></span>
                            <span
                            onClick={() => selectColor(item.id, item.color2)}
                            style={{ backgroundColor: item.color2 }}
                            className={
                                selectedColors[item.id] === item.color2
                                ? "active"
                                : ""
                            }
                            ></span>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        ) : (
        <Row>
            {groupedProducts.map((group, index) => (
            <Col lg={3} md={6} sm={6} key={index}>
                <div className="product-grid">
                {group.map((item) => (
                    <div className="product" key={item.id}>
                    <div className="product-top d-flex justify-content-between">
                        <img src={item.image} alt={item.name} />
                        {item.salepersent !== "" ? (
                        <span
                            className="sale-persent"
                            style={{ backgroundColor: "#00FF66" }}
                        >
                            {item.salepersent}
                        </span>
                        ) : (
                        <div></div>
                        )}
                        <div className="icons">
                        {IsAddedFav(item) ? (
                            <i
                            className="fa-regular fa-heart active"
                            onClick={() => RemoveFavorite(item)}
                            ></i>
                        ) : (
                            <i
                            className="fa-regular fa-heart"
                            onClick={() => AddFavorite(item)}
                            ></i>
                        )}
                        <Link
                            onClick={() => desProduct(item)}
                            to={`/Description/${item.id}`}
                        >
                            <i className="fa-regular fa-eye"></i>
                        </Link>
                        </div>
                    </div>
                    {IsAdded(item) ? (
                        <div
                        onClick={() => RemoveCart(item)}
                        className="RemoveCart"
                        >
                        <p>Remove from Cart</p>
                        </div>
                    ) : (
                        <div onClick={() => AddCart(item)} className="addCart">
                        <p>Add To Cart</p>
                        </div>
                    )}
                    <div className="product-des">
                        <p className="product-title">{item.name}</p>
                        <div className="price d-flex">
                        <p className="curr-price">
                            {Convert(item.new_price)}
                        </p>
                        <div className="star-ctn d-flex ms-2">
                            {renderStars(item.stars)}
                            <span className="reviews ms-2">
                            ({item.reviews || 0})
                            </span>
                        </div>
                        </div>
                        <div className="product-bottom d-flex">
                        <div className="product-bottom d-flex">
                            <span
                            onClick={() => selectColor(item.id, item.color1)}
                            style={{ backgroundColor: item.color1 }}
                            className={
                                selectedColors[item.id] === item.color1
                                ? "active"
                                : ""
                            }
                            ></span>
                            <span
                            onClick={() => selectColor(item.id, item.color2)}
                            style={{ backgroundColor: item.color2 }}
                            className={
                                selectedColors[item.id] === item.color2
                                ? "active"
                                : ""
                            }
                            ></span>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </Col>
            ))}
        </Row>
        )}
        <div className="text-center my-5">
        <button
            className="View-All"
            onClick={() => setViewAll((prev) => !prev)}
        >
            {viewAll ? "Back to Swiper" : "View All Products"}
        </button>
        </div>
    </Container>
    </section>
);
};

export default ExploreProductsAcc;
