"use client";

import { Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/_ui/button";
import { Input } from "@/components/_ui/input";
import { useCart } from "@/components/cart/cart-context";
import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/components/price/usePrice";
import { Wine } from "@/types/product";

export function WineOptions({ wine }: { wine: Wine }) {
    const [quantity, setQuantity] = useState(1);
    const { calculatePrice } = usePrice();
    const { addToCart } = useCart();

    return (
        <div className="grid gap-3">
            <span className="font-display mt-auto text-2xl font-bold text-red-700">
                <DisplayPrice
                    price={calculatePrice({
                        product: wine,
                        packSize: null,
                        quantity: 1,
                    })}
                />{" "}
                <span className="text-xs font-semibold">+GST</span>
            </span>
            <div className="grid grid-cols-2 items-end gap-3">
                <div className="grid gap-1">
                    <label className="flex justify-between text-xs text-gray-500">
                        <span>Quantity</span>
                        <span className="flex items-center gap-1 font-light text-gray-400">
                            {wine.stock} in stock <Info className="size-3" />
                        </span>
                    </label>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(Number(event.target.value))
                        }
                        min={1}
                        max={wine.quantity[wine.quantity.length - 1]}
                        className="text-center"
                    />
                </div>
                <Button onClick={() => addToCart(wine, null, quantity)}>
                    Add to Cart <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}
