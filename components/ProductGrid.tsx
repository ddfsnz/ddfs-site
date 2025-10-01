import { ProductGridTile } from "@/components/ProductGridTile";
import { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-3 lg:grid-cols-4 lg:gap-3">
            {products.map((p) => (
                <ProductGridTile key={p._id} product={p} />
            ))}
        </div>
    );
}
