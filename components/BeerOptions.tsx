"use client";

import { Check, Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { DisplayPrice } from "@/components/DisplayPrice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Beer } from "@/types/product";

export function BeerOptions({ beer }: { beer: Beer }) {
    const [pack, setPack] = useState(beer.beerOptions.quantity[0]);
    const [quantity, setQuantity] = useState(1);
    function calculatedPrice() {
        return pack === beer.beerOptions.quantity[0]
            ? beer.price
            : beer.price * (pack / beer.beerOptions.quantity[0]);
    }
    const { addToCart } = useCart();

    return (
        <div className="grid gap-3">
            <span className="font-display mt-auto text-2xl font-bold text-red-700">
                <DisplayPrice price={calculatedPrice()} />{" "}
                <span className="text-xs font-semibold">+GST</span>
            </span>
            <div className="flex flex-wrap gap-2">
                {beer.beerOptions.quantity.map((o) => (
                    <Button
                        key={o}
                        onClick={() => setPack(o)}
                        variant="outline"
                    >
                        <Check
                            className={cn(
                                "transition-opacity",
                                o !== pack && "opacity-0",
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
                <Button onClick={() => addToCart(beer)}>
                    Add to Cart <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}
