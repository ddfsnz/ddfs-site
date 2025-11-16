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
    removeFromCart: (product: Product) => void;
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
                // Add new item with quantity 1
                return [...prevItems, { product, quantity: quantity }];
            }
        });
    };

    const removeFromCart = (product: Product) => {
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.product._id !== product._id);
        });
    };

    const emptyCart = () => {
        setCartItems([]);
    };

    const value: CartContextType = {
        cartItems,
        addToCart,
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
