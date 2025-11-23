"use client";

import { usePriceContext } from "@/components/price/price-context";

export function DisplayPrice({ price }: { price: number }) {
    const { includeGST } = usePriceContext();
    const displayPrice = includeGST ? price * 1.15 : price;

    return (
        <span>
            ${displayPrice.toFixed(2)}
            {!includeGST ? (
                <span className="text-xs font-medium"> +GST</span>
            ) : null}
        </span>
    );
}
