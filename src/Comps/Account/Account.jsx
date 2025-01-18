import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavHomeAcc from "../nav/navHomeAcc";
import { useAuth } from "../Context/AuthContext";
import { useFavorite } from "../Context/FavoriteContext";
import { getAuth,EmailAuthProvider,reauthenticateWithCredential,updatePassword,} from "firebase/auth";
import { Link } from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Account.css";

const Account = () => {
  const { userName, email } = useAuth(); // `password` cannot be retrieved, and it's excluded for security reasons.
  const { FavProducts } = useFavorite();
  const firstName = userName ? userName.split(" ")[0] : "null";
  const lastName = userName ? userName.split(" ")[1] : "null";

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!", {
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
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.email) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      // Reauthenticate and update password
      reauthenticateWithCredential(user, credential)
        .then(() => {
          return updatePassword(user, newPassword);
        })
        .then(() => {
          toast.success("password updated successfully", {
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
        })
        .catch((error) => {
          console.error("Error updating password:", error.message);
          toast.error("Error: " + error.message, {
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
        });
    } else {
      alert("No user is signed in. Please log in.");
    }
  };

  return (
    <>
      <NavHomeAcc />
      <section id="Account">
        <Container>
          <ToastContainer />
          <header className="d-flex justify-content-between">
            <p className="Path">
              Home /<span className="text-dark"> My Account</span>
            </p>
            <p className="welcome text-dark">
              Welcome!<span className="text-danger"> {userName}</span>
            </p>
          </header>
          <Row className="my-4">
            <Col lg={4} md={4} sm={12}>
              <div className="left">
                <h6>Manage My Account</h6>
                <ul>
                  <li className="text-danger">My Profile</li>
                  <li>Address Book</li>
                  <Link to={'/Cart/CheckOut'}>
                    <li>My Payment Options</li>
                  </Link>
                </ul>
                <h6>My Orders</h6>
                <ul>
                  <li>My Returns</li>
                  <Link to={'/Favorite'}>
                    <li>My Cancellations</li>
                  </Link>
                </ul>
                <h6>My WishList ({FavProducts.length})</h6>
              </div>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <div className="right">
                <div className="right-ctn">
                  <h5 className="text-danger mb-4">Edit Your Profile</h5>
                  <div>
                    <div className="name d-flex justify-space-between">
                      <div className="in-container">
                        <h6>First Name</h6>
                        <input type="text" placeholder={firstName} />
                      </div>
                      <div className="in-container ms-5">
                        <h6>Last Name</h6>
                        <input type="text" placeholder={lastName} />
                      </div>
                    </div>
                    <div className="name d-flex justify-space-between">
                      <div className="in-container">
                        <h6>Email</h6>
                        <input type="email" placeholder={email} />
                      </div>
                      <div className="in-container ms-5">
                        <h6>Address</h6>
                        <input
                          type="text"
                          placeholder="Kingston, 5236, United States"
                        />
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handlePasswordChange}>
                    <h2>Password Changes</h2>
                    <input
                      name="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      required
                    />
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      required
                    />
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      required
                    />
                    <div className="button-container">
                      <button type="button" className="cancel-btn">
                        Cancel
                      </button>
                      <button type="submit" className="save-btn">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Account;
