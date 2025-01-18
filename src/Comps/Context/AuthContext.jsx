import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [IsLogin, setIsLogin] = useState();

  useEffect(() => {
    const auth = getAuth(); // Initialize the auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || "Anonymous");
        setEmail(user.email || "Anonymous");
        setPassword(user.password);
        setIsLogin(true);
      } else {
        setUserName(null);
        setEmail("Anonymous");
        setPassword("Anonymous");
        setIsLogin(false);
      }
      setLoading(false);
      console.log(user);
    });
    console.log(IsLogin);
    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log("User logged out");
        setIsLogin(false);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  if (loading)
    return (
      <div
        className="loading"
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        .<ClipLoader color="#DB4444" size={90} />
      </div>
    );
  const value = {
    userName,
    email,
    password,
    IsLogin,
    handleLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
