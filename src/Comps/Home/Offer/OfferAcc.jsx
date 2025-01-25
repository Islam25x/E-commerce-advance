import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../../Context/CartContext";

import './Offer.css'

const OfferAcc = () => {
    const [timer, setTimer] = useState(2121431);
    const [product, setProduct] = useState(null); // Initially set to null if a single product is expected
    const { AddCart, Cart, RemoveCart, IsAdded } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let response = await axios.get('Assets/all_product.json');
                console.log("Product fetched:", response.data[17]); // Fetch product at index 17
                setProduct(response.data[17]); // Set the specific product
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchProduct();
    }, []);

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

    return (
        <section id="Offer">
            <Container className="main-container d-flex align-items-center">
                <Row>
                    {/* Left Section */}
                    <Col lg={6} md={6} sm={12} className="text-white">
                        <div className="left">
                            <p className="text-success fw-bold">Categories</p>
                            <h1 className="">Enhance Your Music Experience</h1>
                            <div className="timer d-flex">
                                <div className="time-box">
                                    {String(days).padStart(2, '0')} <span>Days</span>
                                </div>
                                <div className="time-box">
                                    {String(hours).padStart(2, '0')} <span>Hours</span>
                                </div>
                                <div className="time-box">
                                    {String(minutes).padStart(2, '0')} <span>Minutes</span>
                                </div>
                                <div className="time-box">
                                    {String(seconds).padStart(2, '0')} <span>Seconds</span>
                                </div>
                            </div>
                            {product && (  // Ensure product is fetched before rendering the button
                                !IsAdded(product) ? (
                                    <button className="Buy-Now" onClick={() => AddCart(product)} variant="success">
                                        Buy Now!
                                    </button>
                                ) : (
                                    <button className="Buy-Now bg-danger" onClick={() => RemoveCart(product)} variant="success">
                                        Remove from Cart
                                    </button>
                                )
                            )}
                        </div>
                    </Col>
                    {/* Right Section */}
                    <Col lg={6} md={6} sm={12} className="text-center">
                        <img
                            src="images/Sapp.png"
                            alt="Sapp"
                            className="img product-image"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default OfferAcc;
