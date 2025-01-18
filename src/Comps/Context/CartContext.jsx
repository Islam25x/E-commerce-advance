import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useFavorite } from "./FavoriteContext";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
const [prvProducts, setPrevProducts] = useState([]);
const [Cart, setCart] = useState([]);
const [isNumeric , setIsNumeric ] = useState(true);

const FavProducts = JSON.parse(window.localStorage.getItem("Favorite"));
console.log(FavProducts);

// Fetching cart from localStorage
useEffect(() => {
    try {
    const storedItems = JSON.parse(window.localStorage.getItem("Cart"));
    setCart(storedItems || []);
    } catch (error) {
    console.error("Failed to get cart items from localStorage:", error);
    setCart([]);
    }
}, []);

// Sync cart with localStorage whenever cart changes
useEffect(() => {
    if (Cart.length > 0) {
    // Save only if Cart has items
    try {
        window.localStorage.setItem("Cart", JSON.stringify(Cart));
    } catch (error) {
        console.error("Error saving cart items to localStorage:", error);
    }
    }
}, [Cart]);

// Fetching products (sales)
useEffect(() => {
    const fetchSales = async () => {
    try {
        const response = await axios.get("Assets/all_product.json");
        console.log("Sales fetched:", response.data);
        setPrevProducts(response.data);
    } catch (error) {
        console.error("Error fetching sales:", error);
    }
    };
    fetchSales();
}, []);

// view All products
const [viewAll, setViewAll] = useState(false);

const handleView = (product) => {
    setViewAll(!viewAll);
};

// Render stars function
const renderStars = (stars) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
    <div className="stars">
        {Array.from({ length: fullStars }, (_, i) => (
        <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {halfStar && <i className="fas fa-star-half-alt"></i>}
        {Array.from({ length: emptyStars }, (_, i) => (
        <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
    </div>
    );
};

const CateProducts = (category) => {
    const products = prvProducts.filter((product) => product.category === category);
    if (products.length === 0) {
        console.warn(`No products found for category: ${category}`);
    }
    return products;
};


// Add product to cart
const AddCart = (product) => {
    const IsProductInCart = Cart.find((cartItem) => cartItem.id === product.id);
    if (!IsProductInCart) {
    setCart([...Cart, { ...product, quantity: 1 }]);
    }
};
// Add All Favorite Products to Cart
const addAllFav = () => {
    // استخدم نسخة من السلة الحالية للحد من التحديثات المتكررة
    setCart((prevCart) => {
    // قم بعمل نسخة من السلة السابقة لتجنب التكرار
    const updatedCart = [...prevCart];

    FavProducts.forEach((FavProduct) => {
        // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
        const IsFavProductInCart = updatedCart.find(
        (cartItem) => cartItem.id === FavProduct.id
        );

        // إذا لم يكن موجودًا، قم بإضافته مع زيادة الكمية
        if (!IsFavProductInCart) {
        updatedCart.push({
            ...FavProduct,
            quantity: (FavProduct.quantity || 0) + 1, // زيادة الكمية بشكل آمن
        });
        }
    });

    return updatedCart; // إرجاع السلة المحدثة
    });
};

// localStorage.clear()
// Remove product from cart
const RemoveCart = (product) => {
    const NewCart = Cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(NewCart);
    window.localStorage.setItem("Cart", JSON.stringify(NewCart));
};
// increase product
const increaseProduct = (product) => {
    const increasedProduct = Cart.map((cartItem) =>
    cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    setCart(increasedProduct);
};

// decrease product
const decreaseProduct = (product) => {
    const decreasedProduct = Cart.map((cartItem) =>
    cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(decreasedProduct);
};

// Get product by ID
const desProduct = (id) => {
    return prvProducts.find((product) => product.id === id);
};

// Function to get product by name (implement this)
const desProductByName = (productName) => {
    return prvProducts.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase().trim())
    );
  };
// IsAdded
const IsAdded = (sale) => {
    return Cart.some((CartItem) => CartItem.id === sale.id);
};
// Total Price

const totalPrice = Cart.reduce((acc, currItem) => {
    return acc + currItem.new_price * currItem.quantity;
}, 0);
const value = {
    renderStars,
    AddCart,
    addAllFav,
    RemoveCart,
    increaseProduct,
    decreaseProduct,
    desProduct,
    desProductByName,
    IsAdded,
    handleView,
    CateProducts,
    viewAll,
    totalPrice,
    isNumeric,
    Cart, // Exposing the cart state
};

return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
const context = useContext(CartContext);
if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
}
return context;
};

export default CartContextProvider;
