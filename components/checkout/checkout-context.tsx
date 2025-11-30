"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

export interface OrderRecipient {
    name: string;
    email: string;
    phone: string;
    embassy: string;
}

interface CheckoutContextType {
    recipient: OrderRecipient;
    updateName: (value: string) => void;
    updateEmail: (value: string) => void;
    updatePhone: (value: string) => void;
    updateEmbassy: (value: string) => void;
    resetRecipient: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
    undefined,
);

interface CheckoutProviderProps {
    children: ReactNode;
}

export const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {
    const [recipient, setRecipient] = useState<OrderRecipient>({
        name: "",
        email: "",
        phone: "",
        embassy: "",
    });

    function updateName(value: string) {
        setRecipient({ ...recipient, name: value });
    }

    function updateEmail(value: string) {
        setRecipient({ ...recipient, email: value });
    }

    function updatePhone(value: string) {
        setRecipient({ ...recipient, phone: value });
    }

    function updateEmbassy(value: string) {
        setRecipient({ ...recipient, embassy: value });
    }

    function resetRecipient() {
        setRecipient({ name: "", email: "", phone: "", embassy: "" });
    }

    const value: CheckoutContextType = {
        recipient,
        updateName,
        updateEmail,
        updatePhone,
        updateEmbassy,
        resetRecipient,
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
};

export function useCheckout(): CheckoutContextType {
    const context = useContext(CheckoutContext);
    if (!context)
        throw new Error("useCheckout must be used within a CheckoutProvider");
    return context;
}
