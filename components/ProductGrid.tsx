import { ProductGridTile } from "@/components/ProductGridTile";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

export function ProductGrid({
    products,
    threeCols = true,
}: {
    products: Product[];
    threeCols?: boolean;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-4 xl:gap-3",
                threeCols && "sm:grid-cols-3",
            )}
        >
            {products.map((p) => (
                <ProductGridTile key={p._id} product={p} />
            ))}
        </div>
    );
}
