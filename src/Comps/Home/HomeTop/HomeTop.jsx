import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import "./HomeTop.css";

const HomeTop = () => {
  // fetch categories
  const [categories, setCategorie] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get("Assets/categorie.json");
        console.log("categories fetched:", response.data);
        setCategorie(response.data);
      } catch (error) {
        console.error("Error fetching categorie:", error);
      }
    };
    fetchCats();
  }, []);

  const { IsLogin } = useAuth();

  // fetch carousel
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get("Assets/carousel.json");
        console.log("carousel fetched:", response.data);
        setCarousel(response.data);
      } catch (error) {
        console.error("Error fetching carousel:", error);
      }
    };
    fetchCats();
  }, []);

  const { CateProducts } = useCart();

  return (
    <section id="HomeTop">
      <Container>
        <Row>
          <Col lg={3} md={3} sm={12}>
            <nav>
              <ul>
                {IsLogin ? (
                  categories.map((categorie) => (
                    <li className="Cats__list text-dark" key={categorie.id}>
                      <Link
                        onClick={() => CateProducts(categorie)}
                        to={`/CategoryProducts/${categorie.catTitle}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {categorie.catTitle}
                      </Link>
                    </li>
                  ))
                ) : (
                  categories.map((categorie) => (
                    <li className="Cats__list text-dark" key={categorie.id}>
                      <Link
                        to={`/SignUp`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {categorie.catTitle}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </nav>
          </Col>

          <Col lg={9} md={9} sm={12}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
            >
              {carousel.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <img
                    className="slide-img"
                    src={slide.carImage}
                    alt={slide.carTitle}
                  />
                  <div className="silde-content">
                    <div className="top d-flex">
                      <img src={slide.TitleImage} alt={slide.TitleImage} />
                      <p className="title">{slide.carTitle}</p>
                    </div>
                    <h1>{slide.carContent}</h1>
                    <div className="bottom d-flex">
                      <button>Shop Now</button>
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeTop;
