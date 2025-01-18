import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Convert from "../../../functions/FormatCurrncy";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import { Link } from "react-router";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
import "swiper/css";
import "swiper/css/navigation";
import "./BestSelling.css";
const BestSelling = () => {
// Fetch setBestSelling BestSellings
const [BestSellings, setBestSellings] = useState([]);

useEffect(() => {
    const fetchBestSellings = async () => {
    try {
        const response = await axios.get("Assets/all_product.json");
        const BestSelling = response.data.filter(
        (product) => product.Type === "BestSelling"
        );
        console.log("BestSelling fetched:", response.data);
        setBestSellings(BestSelling);
    } catch (error) {
        console.error("Error fetching BestSelling:", error);
    }
    };
    fetchBestSellings();
}, []);

// State for viewAll
const [viewAll, setViewAll] = useState(false);

// stars
const { renderStars } = useCart();

return (
    <section id="BestSelling">
    <Container>
        <span className="Month">This Month</span>
        <div className="BestSelling-Top d-flex justify-content-between flex-wrap">
        <h2>Best Selling Products</h2>
        <button
            className="View-All"
            onClick={() => setViewAll((prev) => !prev)}
        >
            {viewAll ? "Back to Swiper" : "View All"}
        </button>
        </div>
        {!viewAll ? (
        <Swiper
            className="position-relative"
            breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1440: { slidesPerView: 4, spaceBetween: 40 },
            }}
            spaceBetween={40}
            slidesPerView={4}
        >
            {BestSellings.map((BestSelling) => (
            <SwiperSlide key={BestSelling.id}>
                <div className="product">
                <div className="product-top d-flex justify-content-between">
                    <img src={BestSelling.image} alt={BestSelling.name} />
                    <div></div>
                    <div className="icons">
                    <Link to="/SignUp">
                        <i className="fa-regular fa-heart"></i>
                    </Link>
                    <Link to="/SignUp">
                        <i className="fa-regular fa-eye"></i>
                    </Link>
                    </div>
                </div>
                <Link
                    to="/SignUp"
                    className="addCart"
                    style={{ textDecoration: "none" }}
                >
                    <p>Add To Cart</p>
                </Link>
                <div className="product-des">
                    <p className="product-title">{BestSelling.name}</p>
                    <div className="price d-flex">
                    <p className="curr-price">
                        {Convert(BestSelling.new_price)}
                    </p>
                    <p className="prev-price">
                        {Convert(BestSelling.old_price)}
                    </p>
                    </div>
                    <div className="star-ctn d-flex">
                    {renderStars(BestSelling.stars)}
                    <span className="reviews ms-2">
                        ({BestSelling.reviews || 0})
                    </span>
                    </div>
                </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        ) : (
        <Row>
            {BestSellings.map((BestSelling) => (
            <Col lg={3} md={6} sm={12} key={BestSelling.id}>
                <div className="product">
                <div className="product-top d-flex justify-content-between">
                    <img src={BestSelling.image} alt={BestSelling.name} />
                    <div></div>
                    <div className="icons">
                    <Link to="/SignUp">
                        <i className="fa-regular fa-heart"></i>
                    </Link>
                    <Link to="/SignUp">
                        <i className="fa-regular fa-eye"></i>
                    </Link>
                    </div>
                </div>
                <Link
                    to="/SignUp"
                    className="addCart"
                    style={{ textDecoration: "none" }}
                >
                    <p>Add To Cart</p>
                </Link>
                <div className="product-des">
                    <p className="product-title">{BestSelling.name}</p>
                    <div className="price d-flex">
                    <p className="curr-price">
                        {Convert(BestSelling.new_price)}
                    </p>
                    <p className="prev-price">
                        {Convert(BestSelling.old_price)}
                    </p>
                    </div>
                    <div className="star-ctn d-flex">
                    {renderStars(BestSelling.stars)}
                    <span className="reviews ms-2">
                        ({BestSelling.reviews || 0})
                    </span>
                    </div>
                </div>
                </div>
            </Col>
            ))}
        </Row>
        )}
    </Container>
    </section>
);
};

export default BestSelling;
