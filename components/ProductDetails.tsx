import { Product } from "@/types/product";

export function ProductDetails({
    product,
    children,
}: {
    product: Product;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-2">
            <span className="text-xs text-gray-500">{product.code}</span>
            <h1 className="font-display text-3xl font-bold">{product.name}</h1>
            <span className="text-gray-500">{product.company.name}</span>
            {children}
        </div>
    );
}
