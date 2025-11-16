"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";

// Define the CartItem interface
interface CartItem {
    product: Product;
    quantity: number;
}

// Define the CartContext type
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
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

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product._id === product._id,
            );
            if (existingItem) {
                // Increase quantity if product already in cart
                return prevItems.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            } else {
                // Add new item with quantity 1
                return [...prevItems, { product, quantity: 1 }];
            }
        });
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
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
