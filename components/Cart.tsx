"use client";

import { ArrowRight, ShoppingCart, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

export function Cart() {
    const { cartItems } = useCart();
    console.log(cartItems);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    Cart {cartItems.length ? `(${cartItems.length})` : null}
                    <ShoppingCart />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="font-display text-3xl font-bold text-red-700">
                        My Cart
                    </SheetTitle>
                </SheetHeader>
                <div className="grid gap-3 p-4">
                    {cartItems.map((c) => (
                        <div key={c.product._id}>{c.product.name}</div>
                    ))}
                </div>
                <SheetFooter>
                    <Button>
                        Send Order <ArrowRight />
                    </Button>
                    <Button variant="outline">
                        Empty Cart <XCircle />
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
