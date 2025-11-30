"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/_ui/button";
import {
    CartItem as CartItemType,
    useCart,
} from "@/components/cart/cart-context";
import { DisplayPrice } from "@/components/price/DisplayPrice";
import { usePrice } from "@/components/price/usePrice";
import { ProductImage } from "@/components/products/ProductImage";

export function CartItem({ cartItem }: { cartItem: CartItemType }) {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { calculatePrice } = usePrice();

    return (
        <div className="flex items-center gap-3 border-b pb-2">
            <div className="aspect-square size-24 shrink-0 overflow-hidden rounded-sm border bg-white">
                <ProductImage product={cartItem.product} />
            </div>
            <div className="grid w-full gap-1">
                <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">
                    {cartItem.product.name}
                </h3>
                <span className="text-xs font-semibold text-red-700">
                    <DisplayPrice price={calculatePrice(cartItem)} />
                    {cartItem.packSize && (
                        <span className="text-xs font-normal text-gray-500">
                            {" • "} {cartItem.packSize} Pack
                        </span>
                    )}
                </span>
                <div className="flex w-full items-center justify-between">
                    <div className="grid grid-cols-3">
                        <Button
                            onClick={() =>
                                decreaseQuantity(
                                    cartItem.product._id,
                                    cartItem.packSize,
                                )
                            }
                            disabled={cartItem.quantity === 1}
                            variant="ghost"
                            size="icon"
                        >
                            <Minus />
                        </Button>
                        <Button disabled variant="ghost" size="icon">
                            {cartItem.quantity}
                        </Button>
                        <Button
                            onClick={() =>
                                increaseQuantity(
                                    cartItem.product._id,
                                    cartItem.packSize,
                                )
                            }
                            variant="ghost"
                            size="icon"
                        >
                            <Plus />
                        </Button>
                    </div>
                    <Button
                        onClick={() =>
                            removeFromCart(
                                cartItem.product._id,
                                cartItem.packSize,
                            )
                        }
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
