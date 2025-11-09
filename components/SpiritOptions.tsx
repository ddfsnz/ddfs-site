"use client";

import { Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { DisplayPrice } from "@/components/DisplayPrice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spirit } from "@/types/product";

export function SpiritOptions({ spirit }: { spirit: Spirit }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="grid gap-3">
            <span className="font-display mt-auto text-2xl font-bold text-red-700">
                <DisplayPrice price={spirit.price} />{" "}
                <span className="text-xs font-semibold">+GST</span>
            </span>
            <div className="grid grid-cols-2 items-end gap-3">
                <div className="grid gap-1">
                    <label className="flex justify-between text-xs text-gray-500">
                        <span>Quantity</span>
                        <span className="flex items-center gap-1 font-light text-gray-400">
                            {spirit.stock} in stock <Info className="size-3" />
                        </span>
                    </label>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(Number(event.target.value))
                        }
                        min={1}
                        max={spirit.quantity[spirit.quantity.length - 1]}
                        className="text-center"
                    />
                </div>
                <Button>
                    Add to Cart <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}
