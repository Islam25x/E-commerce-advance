import { React, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import './WorkedBy.css';

const WorkedBy = () => {
    // fetch WorkedBy
    const [Workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get('Assets/workedBy.json');
                console.log('workers fetched:', response.data);
                setWorkers(response.data);
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error('Error fetching Workers:', error);
                setLoading(false); // Stop loading in case of error
            }
        };
        fetchWorkers();
    }, []);

    // Show a loading indicator while fetching
    if (loading) {
        return (
            <section id="WorkedBy">
                <Container>
                    <div>Loading...</div>
                </Container>
            </section>
        );
    }

    return (
        <section id="WorkedBy">
            <Container>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1440: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                >
                    {Workers.map((Worker) => (
                        <SwiperSlide key={Worker.id}>
                            <div className="worker-card">
                                <div className="top">
                                    <img
                                        src={Worker.image || '/default-image.jpg'} // Fallback image if no image
                                        alt={Worker.name || 'Worker Image'}
                                    />
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
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};

export default WorkedBy;
