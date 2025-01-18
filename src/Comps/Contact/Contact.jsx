import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Comps
import NavHome from "../nav/NavHome";
import NavHomeAcc from "../nav/navHomeAcc";
import "./Contact.css";

const Contact = () => {
const { IsLogin } = useAuth();
const form = useRef(null);

const sendEmail = (e) => {
    e.preventDefault();

    // Form validation
    const formData = new FormData(form.current);
    const firstName = formData.get("name");
    const email = formData.get("Email");
    const phone = formData.get("number");
    const message = formData.get("message");

    if (!firstName || !email || !phone || !message) {
    toast.error("Please fill out all the fields.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
    } else {
    toast.success("Thank you for your message. It has been sent.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
    }
};

return (
    <>
    {IsLogin ? <NavHomeAcc /> : <NavHome />}
    <section id="Contact">
        <Container>
        <ToastContainer />
        <p className="Path">
            Home /<span className="text-dark"> Contact</span>
        </p>
        <Row>
            <Col lg={3} md={3} sm={12}>
            <div className="contact-card">
                <div
                className="contact-section"
                style={{ borderBottom: "3px solid #cccccc" }}
                >
                <div className="icon-title">
                    <i className="fa-solid fa-phone"></i>
                    <h6>Call To Us</h6>
                </div>
                <div className="description">
                    <p>We are available 24/7, 7 days a week.</p>
                    <p>Phone: +880161112222</p>
                </div>
                </div>
                <div className="contact-section">
                <div className="icon-title">
                    <i className="fa-regular fa-envelope"></i>
                    <h6>Write To Us</h6>
                </div>
                <div className="description">
                    <p>
                    Fill out our form and we will contact you within 24 hours.
                    </p>
                    <p>Emails: customer@exclusive.com</p>
                    <p>Emails: support@exclusive.com</p>
                </div>
                </div>
            </div>
            </Col>
            <Col lg={9} md={9} sm={12}>
            <div className="input-section">
                <form ref={form} onSubmit={sendEmail}>
                <div className="top d-flex">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name *"
                    style={{ marginLeft: "0" }}
                    />
                    <input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder="Your Email *"
                    />
                    <input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Your Phone *"
                    />
                </div>
                <div className="body">
                    <textarea
                    name="message"
                    placeholder="Your Message"
                    ></textarea>
                </div>
                <div
                    className="bottom d-flex justify-content-end"
                    style={{ margin: "1rem 0" }}
                >
                    <button type="submit" className="save-btn">
                    Save Changes
                    </button>
                </div>
                </form>
            </div>
            </Col>
        </Row>
        </Container>
    </section>
    </>
);
};

export default Contact;
