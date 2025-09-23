import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { CIDERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Cider } from "@/types/product";

export default async function Page() {
    const ciders = await sanity.fetch<Cider[]>(
        `*[_type == "product" && category._ref == "${CIDERS_CATEGORY_ID}"]`,
    );

    return (
        <>
            <CatalogHeader heading="Ciders" />
            <ProductGrid products={ciders} />
        </>
    );
}
