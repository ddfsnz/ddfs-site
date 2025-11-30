"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/_ui/button";
import { Input } from "@/components/_ui/input";
import { useCart } from "@/components/cart/cart-context";
import { useCheckout } from "@/components/checkout/checkout-context";
import { sendOrder } from "@/lib/actions";

export function CheckoutForm() {
    const { cartItems, cartPrice, emptyCart } = useCart();
    const {
        recipient,
        updateName,
        updateEmail,
        updatePhone,
        updateEmbassy,
        resetRecipient,
    } = useCheckout();
    const router = useRouter();

    async function handleSendOrder() {
        if (!recipient.name || !recipient.email || !recipient.embassy) return;
        try {
            await sendOrder(cartItems, cartPrice, recipient);
            emptyCart();
            resetRecipient();
            router.push("/checkout/complete");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", {
                description: "Please try again.",
            });
        }
    }

    return (
        <form action={handleSendOrder} className="grid grid-cols-1 gap-3">
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
                <label htmlFor="email" className="text-xs text-gray-500">
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
                <label htmlFor="phone" className="text-xs text-gray-500">
                    Phone Number
                </label>
                <Input
                    id="phone"
                    type="tel"
                    value={recipient.phone}
                    onChange={(e) => updatePhone(e.target.value)}
                    required
                />
            </div>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="embassy" className="text-xs text-gray-500">
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
            <Button type="submit" className="mt-3 place-self-end">
                Send Order <ArrowRight />
            </Button>
        </form>
    );
}
