"use client";

import { Trash2 } from "lucide-react";
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
    const { removeFromCart } = useCart();

    return (
        <div className="grid grid-cols-[auto_1fr] place-items-center gap-3">
            <div className="aspect-square size-24 overflow-hidden rounded-sm border bg-white">
                <ProductImage product={product} />
            </div>
            <div className="grid place-items-start gap-1">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <span className="block text-xs text-gray-500">x{quantity}</span>
                <Button
                    onClick={() => removeFromCart(product._id)}
                    variant="outline"
                    size="sm"
                >
                    Remove <Trash2 />
                </Button>
            </div>
        </div>
    );
}
