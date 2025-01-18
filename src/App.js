import {React} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Comps 
import NavTop from "./Comps/nav/NavTop";
import Home from "./Comps/Home/Home";
import HomeAcc from "./Comps/Home/HomeAcc";
import SignUp from "./Comps/SignUp/SignUp";
import Login from "./Comps/Login/Login";
import Footer from "./Comps/Footer/Footer";
import About from'./Comps/About/About'
import Contact from'./Comps/Contact/Contact'
import Description from "./Comps/Description/Description";
import Cart from "./Comps/Cart/Cart";
import Favorite from "./Comps/Favorite/Favorite";
import CheckOut from "./Comps/CheckOut/CheckOut";
import Account from "./Comps/Account/Account";
import CategoryProducts from "./Comps/CategoryProducts/CategoryProducts";
import SearchResult from "./Comps/SearchResult/SearchResult";
import Error from "./Comps/Error/Error";

function App() {
  return (
    <>
      <NavTop />
      <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/HomeAcc" element={<HomeAcc />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/Favorite" element={<Favorite />} />
                    <Route path="/Cart/CheckOut" element={<CheckOut />} />
                    <Route path="/Description/:productId" element={<Description />} />
                    <Route path="/SearchResult/:productIdentifier" element={<SearchResult />} />
                    <Route path="/CategoryProducts/:productCategory" element={<CategoryProducts />} />
                    <Route path="/Account" element={<Account />} />
                    <Route path="/Error" element={<Error />} />
          </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
