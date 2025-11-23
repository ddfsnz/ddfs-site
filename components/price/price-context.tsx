"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface PriceContextType {
    includeGST: boolean;
    toggleIncludeGST: () => void;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

interface PriceProviderProps {
    children: ReactNode;
}

export const PriceProvider: React.FC<PriceProviderProps> = ({ children }) => {
    const [includeGST, setIncludeGST] = useState<boolean>(true);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("includeGST");
        if (storedCart) {
            try {
                setIncludeGST(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error parsing cart from localStorage:", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem("includeGST", JSON.stringify(includeGST));
    }, [includeGST]);

    const toggleIncludeGST = () => {
        setIncludeGST(!includeGST);
    };

    const value: PriceContextType = {
        includeGST,
        toggleIncludeGST,
    };

    return (
        <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
    );
};

export const usePriceContext = (): PriceContextType => {
    const context = useContext(PriceContext);
    if (!context) {
        throw new Error("usePriceContext must be used within a PriceProvider");
    }
    return context;
};
