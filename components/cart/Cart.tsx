"use client";

import { ArrowRight, ShoppingCart, XCircle } from "lucide-react";
import { Button } from "@/components/_ui/button";
import { Input } from "@/components/_ui/input";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/_ui/sheet";
import { useCart } from "@/components/cart/cart-context";
import { CartItem } from "@/components/cart/CartItem";
import { DisplayPrice } from "@/components/price/DisplayPrice";
import { sendOrder } from "@/lib/actions";

export function Cart() {
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
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    Cart
                    {cartItems.length ? (
                        <span className="block h-4 min-w-4 rounded-full bg-white text-xs text-gray-700">
                            {cartItems.length}
                        </span>
                    ) : null}
                    <ShoppingCart />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-11/12 sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle className="font-display text-3xl font-bold text-red-700">
                        My Cart
                    </SheetTitle>
                </SheetHeader>
                <div className="grid gap-3 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <span className="mx-auto block text-sm text-gray-500">
                            Cart is empty
                        </span>
                    ) : (
                        cartItems.map((c) => (
                            <CartItem
                                key={c.product._id + c.packSize}
                                cartItem={c}
                            />
                        ))
                    )}
                </div>
                <SheetFooter>
                    <div className="grid grid-cols-1 border-t py-2 text-center">
                        <span className="text-xs font-normal text-gray-500">
                            Total:
                        </span>
                        <span className="font-display text-center font-bold text-red-700">
                            <DisplayPrice price={cartPrice} />
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <Input
                            type="text"
                            value={recipient.name}
                            onChange={(e) => updateName(e.target.value)}
                        />
                        <Input
                            type="email"
                            value={recipient.email}
                            onChange={(e) => updateEmail(e.target.value)}
                        />
                        <Input
                            type="text"
                            value={recipient.embassy}
                            onChange={(e) => updateEmbassy(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            onClick={emptyCart}
                            disabled={cartItems.length === 0}
                            variant="outline"
                        >
                            Empty Cart <XCircle />
                        </Button>
                        <Button
                            onClick={handleSendOrder}
                            disabled={cartItems.length === 0}
                        >
                            Send Order <ArrowRight />
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
