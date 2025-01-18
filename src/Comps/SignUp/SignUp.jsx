import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup ,setErrorFirebase } from "firebase/auth";
import firebaseApp from "../FirebaseConfig";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import NavLogSign from "../nav/NavLogSign";
import "./SignUp.css";

const SignUp = () => {
    const [firebaseError, setErrorFirebase] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const Formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, "Name must be less than 15 characters")
                .required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: (values) => {
            const { name, email, password } = values;

            setLoading(true);

            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name, 
                        photoURL: "",
                    })
                    .then(() => {
                        setSuccessMsg("Account created successfully!");
                        setLoading(false);
                        setTimeout(() => {
                            navigate("/HomeAcc");
                        }, 2000);
                    })
                    .catch((updateError) => {
                        setErrorFirebase(updateError.message);
                        setLoading(false);
                    });
                })
                .catch((error) => {
                    const errorMessage = error.code;
                    if (errorMessage.includes('auth/email-already-in-use')) {
                        setErrorFirebase('Email already in use. try another one');
                    } else {
                        setErrorFirebase(errorMessage);
                    }
                    setLoading(false);
                });
                
        }
        
    });
      // Handle Google Sign-In
    const handleGoogleSignIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            setSuccessMsg(`Welcome ${user.displayName || "User"}!`);
            setTimeout(() => {
            navigate("/HomeAcc");
            }, 2000);
        })
        .catch((error) => {
            setLoading(false); // Stop loading indicator
        
            // Handle specific Firebase authentication errors
            if (error.code === "auth/wrong-password") {
                setErrorFirebase("Wrong Password. Please try again.");
            } else if (error.code === "auth/user-not-found") {
                setErrorFirebase("No user found with this email.");
            } else if (error.code === "auth/invalid-email") {
                setErrorFirebase("Invalid email address. Please check your input.");
            } else if (error.code === "auth/too-many-requests") {
                setErrorFirebase("Too many failed attempts. Please try again later.");
            } else {
                // Default error message for unexpected errors
                setErrorFirebase("An unexpected error occurred. Please try again.");
            }
        
        });
    };

    return (
        <section id="SignUp">
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
                            <h1 className="heading">Create an account</h1>
                            <p className="sub-heading">Enter your details below</p>
                            <form className="form" onSubmit={Formik.handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input"
                                    autoComplete="on"
                                    onChange={Formik.handleChange}
                                    onBlur={Formik.handleBlur}
                                    value={Formik.values.name}
                                />
                                {Formik.touched.name && Formik.errors.name && (
                                    <p className="errorMsg">{Formik.errors.name}</p>
                                )}
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email or Phone Number"
                                    className="input"
                                    autoComplete="on"
                                    onChange={Formik.handleChange}
                                    onBlur={Formik.handleBlur}
                                    value={Formik.values.email}
                                />
                                {Formik.touched.email && Formik.errors.email && (
                                    <p className="errorMsg">{Formik.errors.email}</p>
                                )}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input"
                                    onChange={Formik.handleChange}
                                    onBlur={Formik.handleBlur}
                                    value={Formik.values.password}
                                />
                                {Formik.touched.password && Formik.errors.password && (
                                    <p className="errorMsg">{Formik.errors.password}</p>
                                )}
                                <button type="submit" className="button" disabled={loading}>
                                    {loading ? "Processing..." : "Create Account"}
                                </button>
                                <button className=" google-button" onClick={handleGoogleSignIn}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_12688_3336)">
                                <path d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z" fill="#4285F4"/>
                                <path d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z" fill="#34A853"/>
                                <path d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z" fill="#FBBC04"/>
                                <path d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z" fill="#EA4335"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_12688_3336">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                                </clipPath>
                                </defs>
                                </svg>

                                Sign Up with Google
                                </button>
                                {successMsg && <p className="succMsg">{successMsg}</p>}
                                {firebaseError && <p className="errorMsg">{firebaseError}</p>}
                            </form>
                            <p className="login">
                                Already have an account? <Link to="/Login">Log in</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SignUp;
