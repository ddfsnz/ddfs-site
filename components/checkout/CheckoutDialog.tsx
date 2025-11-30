"use client";

import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
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
import { sendOrder } from "@/lib/actions";

export function CheckoutDialog({ children }: { children: ReactNode }) {
    const {
        cartItems,
        cartPrice,
        emptyCart,
        recipient,
        updateName,
        updateEmail,
        updateEmbassy,
    } = useCart();

    async function handleSendOrder() {
        if (!recipient.name || !recipient.email || !recipient.embassy) return;
        try {
            await sendOrder(cartItems, cartPrice, recipient);
            alert("Order Sent!");
            emptyCart();
        } catch (error) {
            console.error(error);
            alert("Failed to send order.");
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
                        <label htmlFor="name" className="text-xs text-gray-500">
                            Email
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
                        <label htmlFor="name" className="text-xs text-gray-500">
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
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleSendOrder}
                        disabled={
                            !recipient.name ||
                            !recipient.email ||
                            !recipient.embassy
                        }
                    >
                        Checkout <ArrowRight />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
