import React from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFavorite } from "../Context/FavoriteContext";
import { useCart } from "../Context/CartContext";
import Convert from "../../functions/FormatCurrncy";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
import "swiper/css";
import "swiper/css/navigation";
import "./Favorite.css";
import Suggest from "../Home/Suggest/SuggestAcc";
const Favorite = () => {
const { FavProducts, RemoveFavorite } = useFavorite();
const { AddCart, RemoveCart, IsAdded, addAllFav } = useCart();
return (
    <>
    <section id="Favorite">
        <Container>
        <div className="Favorite-Top d-flex justify-content-between flex-wrap align-items-center">
            <h5>Wishlist ({FavProducts.length})</h5>
            <button className="MoveBag" onClick={addAllFav}>
            Move All To Bag
            </button>
        </div>
        <Swiper
            className="position-relative"
            breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1440: { slidesPerView: 4, spaceBetween: 40 },
                }}
            spaceBetween={40}
            slidesPerView={4}
        >
            {FavProducts.map((FavProduct) => (
            <SwiperSlide key={FavProduct.id}>
                <div className="product">
                <div className="product-top d-flex justify-content-between">
                    <img src={FavProduct.image} alt={FavProduct.name} />
                    {FavProduct.Sale ? (
                    <span className="FavProduct-persent">
                        {FavProduct.salepersent}
                    </span>
                    ) : (
                    <div></div>
                    )}
                    <div className="icons">
                    <i
                        className="fa-solid fa-trash"
                        onClick={() => RemoveFavorite(FavProduct)}
                    ></i>
                    </div>
                </div>
                {IsAdded(FavProduct) ? (
                    <div
                    onClick={() => RemoveCart(FavProduct)}
                    className="RemoveCart"
                    >
                    <p>Remove from Cart</p>
                    </div>
                ) : (
                    <div
                    onClick={() => AddCart(FavProduct)}
                    className="addCart"
                    >
                    <p>Add To Cart</p>
                    </div>
                )}
                <div className="product-des">
                    <p className="product-title">{FavProduct.name}</p>
                    <div className="price d-flex">
                    <p className="curr-price">
                        {Convert(FavProduct.new_price)}
                    </p>
                    {typeof FavProduct.old_price === "number" && (
                        <p className="prev-price">
                        {Convert(FavProduct.old_price)}
                        </p>
                    )}
                    </div>
                </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </Container>
    </section>
    <Suggest />
    </>
);
};

export default Favorite;
