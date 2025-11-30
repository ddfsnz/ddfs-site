"use client";

import { useCart } from "@/components/cart/cart-context";
import { CartItem } from "@/components/cart/CartItem";

export function CartItems() {
    const { cartItems } = useCart();

    return (
        <div className="grid gap-2">
            {cartItems.length === 0 ? (
                <span className="mx-auto block text-sm text-gray-500">
                    Cart is empty
                </span>
            ) : (
                cartItems.map((c) => (
                    <CartItem key={c.product._id + c.packSize} cartItem={c} />
                ))
            )}
        </div>
    );
}
