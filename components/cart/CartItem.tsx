"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/_ui/button";
import { useCart } from "@/components/cart/cart-context";
import { ProductImage } from "@/components/ProductImage";
import { Product } from "@/types/product";

export function CartItem({
    product,
    quantity,
}: {
    product: Product;
    quantity: number;
}) {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    return (
        <div className="flex items-center gap-3">
            <div className="aspect-square size-24 shrink-0 overflow-hidden rounded-sm border bg-white">
                <ProductImage product={product} />
            </div>
            <div className="grid w-full gap-1">
                <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">
                    {product.name}
                </h3>
                <div className="flex w-full items-center justify-between">
                    <div className="grid grid-cols-3">
                        <Button
                            onClick={() => decreaseQuantity(product._id)}
                            disabled={quantity === 1}
                            variant="ghost"
                            size="icon"
                        >
                            <Minus />
                        </Button>
                        <Button disabled variant="ghost" size="icon">
                            {quantity}
                        </Button>
                        <Button
                            onClick={() => increaseQuantity(product._id)}
                            variant="ghost"
                            size="icon"
                        >
                            <Plus />
                        </Button>
                    </div>
                    <Button
                        onClick={() => removeFromCart(product._id)}
                        variant="outline"
                        size="icon"
                    >
                        <Trash2 className="text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
