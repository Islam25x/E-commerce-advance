import {React,useRef,useState,useEffect} from 'react'
import { Container } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router';

import './Categories.css'
const Categories = () => {
        // Fetch Flash Sales
        const [Categories, setCategories] = useState([]);

        useEffect(() => {
            const fetchSales = async () => {
            try {
                const response = await axios.get("Assets/browseCategory.json");
                console.log("browseCategory fetched:", response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching browseCategory:", error);
            }
            };
            fetchSales();
        }, []);

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
        <section id='Categories'>
            <Container>
                <span className='cats'>Categories</span>
                    <div className="left-side d-flex justify-content-between flex-wrap mt-4">
                        <h1>Browse By Category</h1>
                        <div className="swiper-nav-buttons">
                        <button onClick={handlePrev} className="swiper-button prev">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={handleNext} className="swiper-button next">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div> 
                </div>
                <Swiper
                    className="position-relative"
                    ref={swiperRef}
                    modules={[Navigation]}
                    breakpoints={{
                        // Small screens (e.g., mobile)
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        // Medium screens (e.g., tablets)
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        // Large screens (e.g., desktops)
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        // Extra large screens
                        1440: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                    }}
                    spaceBetween={40}
                    slidesPerView={6}
                >
                    {
                        Categories.map((Category)=>(
                            <SwiperSlide key={Category.id}>
                                <Link to='/SignUp' style={{textDecoration:'none'}}>
                                    <div className="cat-ctn">
                                        <i className={Category.icon}></i>
                                        <p>{Category.title}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <hr style={{color:'gray',marginTop:'4rem'}} />
            </Container>
        </section>
    )
}

export default Categories