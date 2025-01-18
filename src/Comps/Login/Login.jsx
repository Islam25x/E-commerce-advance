import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../FirebaseConfig';
import NavLogSign from "../nav/NavLogSign";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from '../Context/AuthContext';
import './Login.css';

const Login = () => {
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            setError(null);
            setLoading(true);

            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    
                    const user = userCredential.user;
                    console.log("Logged in user:", user.email);
                    setLoading(false);
                    navigate('/HomeAcc'); 
                })
                .catch((err) => {
                    
                    setLoading(false);
                    if (err.code === 'auth/user-not-found') {
                        setError("No user found with this email.");
                    } else if (err.code === 'auth/wrong-password') {
                        setError("Incorrect password.");
                    } else {
                        setError("An error occurred. Please try again.");
                    }
                });
        },
    });

    return (
        <section id="Login">
            <NavLogSign />
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ral6hyL6iuGwkBDKBFumysabow6TfNXTBRd5RNCgFu8ciITXLnkAF5n3asTub1a2iu4Xgm5iA-dmvElp-bRPJtxApYnrLMKhH-Q5GifzRiV6xOVvsm~vVMMSYRQ-w8Br0fW1scOlxB~Uw0-bnJViKYdQekYyzt-OwSCgJx6bo08NcmvvO8UK8K1wlemT2oXwE9BXWzseX-4HE5k1YnB5LstcmCmxQCO4bAFyF1rANxBz1Wt8J-Z9QrcM2JrYSAkb90d4GPl~jnBWjUYjk34f3~mNIVUecWrcgpJHRuVI8Qq1FynE9aUir~DKSzHBhQmDO0mwq2hVbf2Cos3H3Pd8TQ__"
                            alt="Sign Img"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <div className="right-side">
                            <h1 className="heading">Log in to Exclusive</h1>
                            <p className="sub-heading">Enter your details below</p>

                            {error && <p className="error-message" style={{ color: "red" }}>{error}</p>} 

                            <form className="form" onSubmit={formik.handleSubmit}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="input"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p style={{ color: 'red', fontSize: '0.9rem' }}>{formik.errors.email}</p>
                                )}

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p style={{ color: 'red', fontSize: '0.9rem' }}>{formik.errors.password}</p>
                                )}

                                <div className="btns d-flex justify-content-between">
                                    <button
                                        type="submit"
                                        className="button"
                                        style={{ width: '9rem' }}
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Log In"}
                                    </button>
                                    <p>Forget Password?</p>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
