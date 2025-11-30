"use client";

import { ArrowRight, ShoppingCart, XCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/_ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/_ui/sheet";
import { useCart } from "@/components/cart/cart-context";
import { CartItems } from "@/components/cart/CartItems";
import { DisplayPrice } from "@/components/price/DisplayPrice";
import { cn } from "@/lib/utils";

export function CartSheet() {
    const { cartItems, cartPrice, emptyCart } = useCart();
    const closeRef = useRef<HTMLButtonElement>(null);

    return (
        <Sheet>
            <SheetClose ref={closeRef} className="hidden" />
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
                <div className="overflow-y-auto p-4">
                    <CartItems />
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
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            onClick={emptyCart}
                            disabled={cartItems.length === 0}
                            variant="outline"
                        >
                            Empty Cart <XCircle />
                        </Button>
                        <Link
                            href="/checkout"
                            className={cn(
                                cartItems.length === 0 && "pointer-events-none",
                            )}
                        >
                            <Button
                                disabled={cartItems.length === 0}
                                className="w-full"
                                onClick={() => closeRef.current?.click()}
                            >
                                Checkout <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
