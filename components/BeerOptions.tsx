"use client";

import { Check, Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/_ui/button";
import { Input } from "@/components/_ui/input";
import { useCart } from "@/components/cart/cart-context";
import { DisplayPrice } from "@/components/DisplayPrice";
import { usePrice } from "@/components/price/usePrice";
import { cn } from "@/lib/utils";
import { Beer } from "@/types/product";

export function BeerOptions({ beer }: { beer: Beer }) {
    const [packSize, setPackSize] = useState(beer.beerOptions.quantity[0]);
    const [quantity, setQuantity] = useState(1);
    const { calculatePrice } = usePrice();
    const { addToCart } = useCart();

    return (
        <div className="grid gap-3">
            <span className="font-display mt-auto text-2xl font-bold text-red-700">
                <DisplayPrice
                    price={calculatePrice({
                        product: beer,
                        packSize,
                        quantity: 1,
                    })}
                />{" "}
                <span className="text-xs font-semibold">+GST</span>
            </span>
            <div className="flex flex-wrap gap-2">
                {beer.beerOptions.quantity.map((o) => (
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
            <div className="grid grid-cols-2 items-end gap-3">
                <div className="grid gap-1">
                    <label className="flex justify-between text-xs text-gray-500">
                        <span>Quantity</span>
                        <span className="flex items-center gap-1 font-light text-gray-400">
                            {beer.stock} in stock <Info className="size-3" />
                        </span>
                    </label>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(Number(event.target.value))
                        }
                        min={1}
                        max={beer.quantity[beer.quantity.length - 1]}
                        className="text-center"
                    />
                </div>
                <Button onClick={() => addToCart(beer, packSize, quantity)}>
                    Add to Cart <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}
