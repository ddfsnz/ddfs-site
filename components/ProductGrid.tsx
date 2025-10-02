import { ProductGridTile } from "@/components/ProductGridTile";
import { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 xl:gap-3">
            {products.map((p) => (
                <ProductGridTile key={p._id} product={p} />
            ))}
        </div>
    );
}
