import {React, useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import axios from "axios";
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import './WorkedBy.css'
const WorkedBy = () => {

        // fetch WorkedBy
        const [Workers , setWorkers] = useState([])
    
        useEffect(()=>{
            const fetchCats = async () => {
                try {
                    const response = await axios.get("Assets/WorkedBy.json");
                    console.log("workers fetched:", response.data); 
                    setWorkers(response.data)
                } catch (error) {
                    console.error("Error fetching Workers:", error);
                }
            };
            fetchCats()
        }, [])


    return (
        <section id='WorkedBy'>
            <Container>
                <Swiper
                    modules={[Pagination,Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        // Small screens (e.g., mobile)
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // Medium screens (e.g., tablets)
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        // Large screens (e.g., desktops)
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        // Extra large screens
                        1440: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    // autoplay={{
                    //     delay: 2500, 
                    //     disableOnInteraction: false,
                    // }}
                    pagination={{ clickable: true }}
                >
                    {
                        Workers.map((Worker)=>(
                            <SwiperSlide key={Worker.id}>
                                <div className="worker-card">
                                    <div className="top">
                                        <img src={Worker.image} alt="" />
                                    </div>
                                    <div className="bottom my-4">
                                        <h4>{Worker.name}</h4>
                                        <p>{Worker.work}</p>
                                        <div className="icons d-flex">
                                            <i className="fa-brands fa-twitter"></i>
                                            <i className="fa-brands fa-instagram"></i>
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </section>
    )
}

export default WorkedBy