import { Product } from "@/types/product";

export function ProductTile({ product }: { product: Product }) {
    return (
        <div className="grid grid-cols-1 gap-2 rounded-md border border-gray-100 bg-gray-50 p-2">
            <div className="aspect-square rounded-s bg-white"></div>
            <h3 className="line-clamp-2 text-sm font-semibold">
                {product.name}
            </h3>
            {"beerOptions" in product && (
                <>
                    <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                        <span>
                            {product.beerOptions.size.value}
                            {product.beerOptions.size.unit}
                        </span>
                        <span>{product.beerOptions.container}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                        <span>
                            {product.beerOptions.quantity.length === 1
                                ? "Quantity:"
                                : "Quantities:"}
                        </span>
                        <span>
                            {product.beerOptions.quantity
                                .map((q) => q)
                                .join(", ")}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                        {product.beerOptions.abv}% ABV
                    </div>
                </>
            )}
            <span className="font-bold text-red-700">
                ${product.price}
                <span className="ml-1 text-xs font-semibold">+GST</span>
            </span>
        </div>
    );
}
