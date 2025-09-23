import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { HONEY_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Honey } from "@/types/product";

export default async function Page() {
    const honeys = await sanity.fetch<Honey[]>(
        `*[_type == "product" && category._ref == "${HONEY_CATEGORY_ID}"]`,
    );

    return (
        <>
            <CatalogHeader heading="Manuka Honey" />
            <ProductGrid products={honeys} />
        </>
    );
}
