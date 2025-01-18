import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const FavoriteContext = createContext({});

const FavoriteContextProvider = ({ children }) => {
    const [FavProducts, setFavProducts] = useState([]);

    // Fetching cart from localStorage
        useEffect(() => {
        try {
            const storedItems = JSON.parse(window.localStorage.getItem("Favorite"));
            setFavProducts(storedItems || []);
        } catch (error) {
            console.error("Failed to get cart items from localStorage:", error);
            setFavProducts([]);
        }
        }, []);
    
      // Sync cart with localStorage whenever cart changes
        useEffect(() => {
            if (FavProducts.length > 0) { // Save only if Cart has items
                try {
                    window.localStorage.setItem("Favorite", JSON.stringify(FavProducts));
                } catch (error) {
                    console.error("Error saving cart items to localStorage:", error);
                }
            }
        }, [FavProducts]);

        // Add product to Favorite
    const AddFavorite = (product)=>{
        const IsProductInCart = FavProducts.find((FavProduct) => FavProduct.id === product.id);
        if(!IsProductInCart){
            setFavProducts([...FavProducts,{...product}])
        }
    } 
      // Remove product from cart
    const RemoveFavorite = (product)=>{
        const NewFavorite = FavProducts.filter((FavProduct)=> FavProduct.id !== product.id)
        setFavProducts(NewFavorite)
        window.localStorage.setItem("Favorite", JSON.stringify(NewFavorite));
    }
    // IsAdded
    const IsAddedFav = (Product)=>{
        return FavProducts.some((FavProduct)=> FavProduct.id === Product.id )
    }
    const value = {
        AddFavorite,
        RemoveFavorite,
        IsAddedFav,
        FavProducts
    };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};

export default FavoriteContextProvider;
