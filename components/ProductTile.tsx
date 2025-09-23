import { Product } from "@/types/product";

export function ProductTile({ product }: { product: Product }) {
    return (
        <div className="grid rounded-md bg-gray-50 p-2">
            <h3 className="line-clamp-2 text-sm font-semibold">
                {product.name}
            </h3>
        </div>
    );
}
