"use client";

import { ArrowRight, ShoppingCart, XCircle } from "lucide-react";
import { Button } from "@/components/_ui/button";
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

export function Cart() {
    const { cartItems, emptyCart } = useCart();

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
            <SheetContent className="sm:max-w-xl">
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
                    <Button disabled={cartItems.length === 0}>
                        Send Order <ArrowRight />
                    </Button>
                    <Button
                        onClick={emptyCart}
                        disabled={cartItems.length === 0}
                        variant="outline"
                    >
                        Empty Cart <XCircle />
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
