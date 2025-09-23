import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { sanity, TOBACCO_CATEGORY_ID } from "@/lib/sanity";
import { Tobacco } from "@/types/product";

export default async function Page() {
    const tobaccos = await sanity.fetch<Tobacco[]>(
        `*[_type == "product" && category._ref == "${TOBACCO_CATEGORY_ID}"]`,
    );

    return (
        <>
            <CatalogHeader heading="Tobacco" />
            <ProductGrid products={tobaccos} />
        </>
    );
}
