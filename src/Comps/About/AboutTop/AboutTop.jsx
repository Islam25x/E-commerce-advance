import React from 'react'
import { Container ,Row ,Col } from 'react-bootstrap'

import './AboutTop.css'
const AboutTop = () => {
    return (
        <section id='AboutTop'>
            <Container>
                <p className='Path'>Account / <span className='text-dark'>About</span></p>
                <Row>
                    <Col lg={6} md={6} sm={12} className='mt-4'>
                        <h1 className='my-5'>Our Story</h1>
                        <p className='mb-4'>
                            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh.
                            Supported by wide range of tailored marketing, data and service solutions,
                            Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
                        </p>
                        <p>
                            Exclusive has more than 1 Million products to offer,
                            growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <img src="/images/playstation.png" alt="About" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AboutTop
