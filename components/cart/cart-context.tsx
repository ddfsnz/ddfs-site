"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { Product } from "@/types/product";

// Define the CartItem interface
interface CartItem {
    product: Product;
    quantity: number;
}

// Define the CartContext type
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    emptyCart: () => void;
    // You can add more methods like removeFromCart, updateQuantity, etc., if needed
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the CartProvider component
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error parsing cart from localStorage:", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Helper function to update quantity and remove if <= 0
    const updateQuantity = (productId: string, delta: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product._id === productId,
            );
            if (existingItem) {
                const newQuantity = existingItem.quantity + delta;
                if (newQuantity <= 0) {
                    // Remove the item if quantity becomes 0 or negative
                    return prevItems.filter(
                        (item) => item.product._id !== productId,
                    );
                } else {
                    return prevItems.map((item) =>
                        item.product._id === productId
                            ? { ...item, quantity: newQuantity }
                            : item,
                    );
                }
            } else {
                return prevItems;
            }
        });
    };

    const addToCart = (product: Product, quantity: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product._id === product._id,
            );
            if (existingItem) {
                // Increase quantity if product already in cart
                return prevItems.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            } else {
                // Add new item with quantity
                return [...prevItems, { product, quantity: quantity }];
            }
        });
    };

    const increaseQuantity = (productId: string) => {
        updateQuantity(productId, 1);
    };

    const decreaseQuantity = (productId: string) => {
        updateQuantity(productId, -1);
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.product._id !== productId);
        });
    };

    const emptyCart = () => {
        setCartItems([]);
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        emptyCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

// Define the useCart hook
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
