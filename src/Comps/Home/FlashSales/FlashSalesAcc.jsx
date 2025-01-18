import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Convert from "../../../functions/FormatCurrncy";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
import "swiper/css";
import "swiper/css/navigation";
import "./FlashSales.css";

const FlashSalesAcc = () => {
// Timer
const [timer, setTimer] = useState(305400);

useEffect(() => {
    const interval = setInterval(() => {
    setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
}, []);

const formatTime = () => {
    const days = Math.floor(timer / (24 * 3600));
    const hours = Math.floor((timer % (24 * 3600)) / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    return { days, hours, minutes, seconds };
};

const { days, hours, minutes, seconds } = formatTime();

// Fetch Flash Sales
const [sales, setSales] = useState([]);

useEffect(() => {
    const fetchSales = async () => {
    try {
        const response = await axios.get("Assets/all_product.json");
        const salesItem = response.data.filter((sale) => sale.Sale === true);
        console.log("sales fetched:", salesItem);
        setSales(salesItem);
    } catch (error) {
        console.error("Error fetching sales:", error);
    }
    };
    fetchSales();
}, []);
// State for viewAll
const [viewAll, setViewAll] = useState(false);

// stars
const { renderStars, desProduct, AddCart, Cart, RemoveCart, IsAdded } =useCart();
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
return (
    <section id="FlashSales">
    <Container>
        <span className="Today">Today’s</span>
        <div className="left-side d-flex justify-content-between flex-wrap">
        <div className="Flash-Top d-flex">
            <h2 className="title">Flash Sales</h2>
            <div className="timer me-3">
            <p>Days</p>
            <h2>{String(days).padStart(2, "0")}</h2>
            </div>
            <span>:</span>
            <div className="timer">
            <p>Hours</p>
            <h2>{String(hours).padStart(2, "0")}</h2>
            </div>
            <span>:</span>
            <div className="timer">
            <p>Minutes</p>
            <h2>{String(minutes).padStart(2, "0")}</h2>
            </div>
            <span>:</span>
            <div className="timer">
            <p>Seconds</p>
            <h2>{String(seconds).padStart(2, "0")}</h2>
            </div>
        </div>
        {/* Custom Navigation Buttons */}
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
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1440: { slidesPerView: 4, spaceBetween: 40 },
            }}
            spaceBetween={40}
            slidesPerView={4}
        >
            {sales.map((sale) => (
            <SwiperSlide key={sale.id}>
                <div className="product">
                <div className="product-top d-flex justify-content-between">
                    <img src={sale.image} alt={sale.name} />
                    <span className="sale-persent">{sale.salepersent}</span>
                    <div className="icons">
                    {IsAddedFav(sale) ? (
                        <i
                        className="fa-regular fa-heart active"
                        onClick={() => RemoveFavorite(sale)}
                        ></i>
                    ) : (
                        <i
                        className="fa-regular fa-heart"
                        onClick={() => AddFavorite(sale)}
                        ></i>
                    )}
                    <Link
                        onClick={() => desProduct(sale)}
                        to={`/Description/${sale.id}`}
                    >
                        <i className="fa-regular fa-eye"></i>
                    </Link>
                    </div>
                </div>
                {IsAdded(sale) ? (
                    <div
                    onClick={() => RemoveCart(sale)}
                    className="RemoveCart"
                    >
                    <p>Remove from Cart</p>
                    </div>
                ) : (
                    <div onClick={() => AddCart(sale)} className="addCart">
                    <p>Add To Cart</p>
                    </div>
                )}
                <div className="product-des">
                    <p className="product-title">{sale.name}</p>
                    <div className="price d-flex">
                    <p className="curr-price">{Convert(sale.new_price)}</p>
                    <p className="prev-price">{Convert(sale.old_price)}</p>
                    </div>
                    {/* Render Stars */}
                    <div className="star-ctn d-flex">
                    {renderStars(sale.stars)}
                    <span className="reviews ms-2">
                        ({sale.reviews || 0})
                    </span>
                    </div>
                </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        ) : (
        <Row>
            {sales.map((sale) => (
            <Col lg={3} md={6} sm={12} key={sale.id}>
                <div className="product">
                <div className="product-top d-flex justify-content-between">
                    <img src={sale.image} alt={sale.name} />
                    <span className="sale-persent">{sale.salepersent}</span>
                    <div className="icons">
                    {IsAddedFav(sale) ? (
                        <i
                        className="fa-regular fa-heart active"
                        onClick={() => RemoveFavorite(sale)}
                        ></i>
                    ) : (
                        <i
                        className="fa-regular fa-heart"
                        onClick={() => AddFavorite(sale)}
                        ></i>
                    )}
                    <Link
                        onClick={() => desProduct(sale)}
                        to={`/Description/${sale.id}`}
                    >
                        <i className="fa-regular fa-eye"></i>
                    </Link>
                    </div>
                </div>
                {IsAdded(sale) ? (
                    <div
                    onClick={() => RemoveCart(sale)}
                    className="RemoveCart"
                    >
                    <p>Remove from Cart</p>
                    </div>
                ) : (
                    <div onClick={() => AddCart(sale)} className="addCart">
                    <p>Add To Cart</p>
                    </div>
                )}
                <div className="product-des">
                    <p className="product-title">{sale.name}</p>
                    <div className="price d-flex">
                    <p className="curr-price">{Convert(sale.new_price)}</p>
                    <p className="prev-price">{Convert(sale.old_price)}</p>
                    </div>
                    {/* Render Stars */}
                    <div className="star-ctn d-flex">
                    {renderStars(sale.stars)}
                    <span className="reviews ms-2">
                        ({sale.reviews || 0})
                    </span>
                    </div>
                </div>
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
        <hr style={{ color: "gray" }} />
    </Container>
    </section>
);
};

export default FlashSalesAcc;
