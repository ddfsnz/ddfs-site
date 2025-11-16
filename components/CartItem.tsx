"use client";

import { ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
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
            <div className="flex aspect-square size-24 items-center justify-center overflow-hidden rounded-sm border bg-white">
                <ImageIcon className="size-8 text-gray-300" />
            </div>
            <div className="grid place-items-start gap-1">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <span className="block text-xs text-gray-500">x{quantity}</span>
                <Button
                    onClick={() => removeFromCart(product)}
                    variant="outline"
                    size="sm"
                >
                    Remove <Trash2 />
                </Button>
            </div>
        </div>
    );
}
