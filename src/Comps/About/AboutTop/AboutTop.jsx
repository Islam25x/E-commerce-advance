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
                        <img src="https://s3-alpha-sig.figma.com/img/fcc8/9aaa/7b85f8c1dcce81e71e2eb178be13bd4d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BDfni8rCU~Hd8HmQTcRKmSfBOaZ4d02Syon5uMAK2LNwD43wfI6FDzVfxZLi6DUewrq0-WYSgyqF5bkqTswS5OXRyq4Gr95f2QVLDBezcTR7~NEUp0XM0jYBbrffYGGPlZfx7CPTjClheGC0WnIkd2XNJyL4uNOoN4goD3rW820-1xNfHGMhaqMuas7fjTDl~jrOIjsM8VQXDMQjhnmMsgLe03fJQXHyd345TIXqkLWFFlryPApTIw7EB9cF3x4uKaZoHtddrDuBI59MUrXMug7mWVWRAaGetU76aIBk4s1Pz9DvTAa90SS6GxWi~q4yQwS~DTu0LQMGMWGfdzbXBA__" alt="About" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AboutTop