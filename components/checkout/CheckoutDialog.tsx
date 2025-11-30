"use client";

import { ArrowRight } from "lucide-react";
import { ReactNode, useRef, useState } from "react";
import { Button } from "@/components/_ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/_ui/dialog";
import { Input } from "@/components/_ui/input";
import { useCart } from "@/components/cart/cart-context";
import { useCheckout } from "@/components/checkout/checkout-context";
import { sendOrder } from "@/lib/actions";

export function CheckoutDialog({ children }: { children: ReactNode }) {
    const { cartItems, cartPrice, emptyCart } = useCart();
    const {
        recipient,
        updateName,
        updateEmail,
        updatePhone,
        updateEmbassy,
        resetRecipient,
    } = useCheckout();
    const [isError, setIsError] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    async function handleSendOrder() {
        if (!recipient.name || !recipient.email || !recipient.embassy) return;
        try {
            await sendOrder(cartItems, cartPrice, recipient);
            emptyCart();
            resetRecipient();
            closeRef.current?.click();
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                        Enter your details to confirm your order:
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="name" className="text-xs text-gray-500">
                            Full Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={recipient.name}
                            onChange={(e) => updateName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <label
                            htmlFor="email"
                            className="text-xs text-gray-500"
                        >
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={recipient.email}
                            onChange={(e) => updateEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <label
                            htmlFor="phone"
                            className="text-xs text-gray-500"
                        >
                            Phone Number
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={recipient.phone}
                            onChange={(e) => updatePhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <label
                            htmlFor="embassy"
                            className="text-xs text-gray-500"
                        >
                            Embassy
                        </label>
                        <Input
                            id="embassy"
                            type="text"
                            value={recipient.embassy}
                            onChange={(e) => updateEmbassy(e.target.value)}
                            required
                        />
                    </div>
                    {isError && (
                        <span className="text-center text-xs text-red-500">
                            Something went wrong, please try again.
                        </span>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" ref={closeRef}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSendOrder}
                        disabled={
                            !recipient.name ||
                            !recipient.email ||
                            !recipient.phone ||
                            !recipient.embassy
                        }
                    >
                        Send Order <ArrowRight />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
