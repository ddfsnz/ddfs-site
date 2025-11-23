"use client";

import { Check, Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/_ui/button";
import { Input } from "@/components/_ui/input";
import { useCart } from "@/components/cart/cart-context";
import { DisplayPrice } from "@/components/price/DisplayPrice";
import { usePrice } from "@/components/price/usePrice";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

export function ProductOptions({
    product,
    packSizes,
}: {
    product: Product;
    packSizes?: number[];
}) {
    const [packSize, setPackSize] = useState(packSizes ? packSizes[0] : null);
    const [quantity, setQuantity] = useState(1);
    const { calculatePrice } = usePrice();
    const { addToCart } = useCart();

    return (
        <div className="grid gap-3">
            <span className="font-display mt-auto text-2xl font-bold text-red-700">
                <DisplayPrice
                    price={calculatePrice({
                        product,
                        packSize,
                        quantity: 1,
                    })}
                />
            </span>
            {packSizes && (
                <div className="flex flex-wrap gap-2">
                    {packSizes.map((o) => (
                        <Button
                            key={o}
                            onClick={() => setPackSize(o)}
                            variant="outline"
                        >
                            <Check
                                className={cn(
                                    "transition-opacity",
                                    o !== packSize && "opacity-0",
                                )}
                            />
                            {o} Pack
                        </Button>
                    ))}
                </div>
            )}
            <div className="grid grid-cols-2 items-end gap-3">
                <div className="grid gap-1">
                    <label className="flex justify-between text-xs text-gray-500">
                        <span>Quantity</span>
                        <span className="flex items-center gap-1 font-light text-gray-400">
                            {product.stock} in stock <Info className="size-3" />
                        </span>
                    </label>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(Number(event.target.value))
                        }
                        min={1}
                        max={product.quantity[product.quantity.length - 1]}
                        className="text-center"
                    />
                </div>
                <Button onClick={() => addToCart(product, packSize, quantity)}>
                    Add to Cart <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}
