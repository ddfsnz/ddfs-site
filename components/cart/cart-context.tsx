"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { usePrice } from "@/components/price/usePrice";
import { Product } from "@/types/product";

export interface CartItem {
    product: Product;
    packSize: number | null;
    quantity: number;
}

export interface OrderRecipient {
    name: string;
    email: string;
    embassy: string;
}

// Define the CartContext type
interface CartContextType {
    // Cart
    cartItems: CartItem[];
    cartPrice: number;
    addToCart: (
        product: Product,
        packSize: number | null,
        quantity: number,
    ) => void;
    increaseQuantity: (productId: string, packSize: number | null) => void;
    decreaseQuantity: (productId: string, packSize: number | null) => void;
    removeFromCart: (productId: string, packSize: number | null) => void;
    emptyCart: () => void;
    // Recipient
    recipient: OrderRecipient;
    updateName: (value: string) => void;
    updateEmail: (value: string) => void;
    updateEmbassy: (value: string) => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the CartProvider component
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { calculateCartPrice } = usePrice();
    const cartPrice = calculateCartPrice(cartItems);

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
    const updateQuantity = (
        productId: string,
        packSize: number | null,
        delta: number,
    ) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) =>
                    item.product._id === productId &&
                    item.packSize === packSize,
            );
            if (existingItem) {
                const newQuantity = existingItem.quantity + delta;
                if (newQuantity <= 0) {
                    // Remove the item if quantity becomes 0 or negative
                    return prevItems.filter(
                        (item) =>
                            !(
                                item.product._id === productId &&
                                item.packSize === packSize
                            ),
                    );
                } else {
                    return prevItems.map((item) =>
                        item.product._id === productId &&
                        item.packSize === packSize
                            ? { ...item, quantity: newQuantity }
                            : item,
                    );
                }
            } else {
                return prevItems;
            }
        });
    };

    const addToCart = (
        product: Product,
        packSize: number | null,
        quantity: number,
    ) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) =>
                    item.product._id === product._id &&
                    item.packSize === packSize,
            );
            if (existingItem) {
                // Increase quantity if product with same packSize already in cart
                return prevItems.map((item) =>
                    item.product._id === product._id &&
                    item.packSize === packSize
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            } else {
                // Add new item with quantity and packSize
                return [...prevItems, { product, quantity, packSize }];
            }
        });
    };

    const increaseQuantity = (productId: string, packSize: number | null) => {
        updateQuantity(productId, packSize, 1);
    };

    const decreaseQuantity = (productId: string, packSize: number | null) => {
        updateQuantity(productId, packSize, -1);
    };

    const removeFromCart = (productId: string, packSize: number | null) => {
        setCartItems((prevItems) => {
            return prevItems.filter(
                (item) =>
                    !(
                        item.product._id === productId &&
                        item.packSize === packSize
                    ),
            );
        });
    };

    const emptyCart = () => {
        setCartItems([]);
    };

    const [recipient, setRecipient] = useState<OrderRecipient>({
        name: "Joseph Collicoat",
        email: "jcollicoat@gmail.com",
        embassy: "Test Embassy",
    });

    function updateName(value: string) {
        setRecipient({ ...recipient, name: value });
    }

    function updateEmail(value: string) {
        setRecipient({ ...recipient, email: value });
    }

    function updateEmbassy(value: string) {
        setRecipient({ ...recipient, embassy: value });
    }

    const value: CartContextType = {
        cartItems,
        cartPrice,
        recipient,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        emptyCart,
        updateName,
        updateEmail,
        updateEmbassy,
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
