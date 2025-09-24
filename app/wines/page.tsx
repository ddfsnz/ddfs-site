import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { sanity, WINES_CATEGORY_ID } from "@/lib/sanity";
import { Wine } from "@/types/product";

export default async function Page() {
    const wines = await sanity.fetch<Wine[]>(
        `*[_type == "product" && category._ref == "${WINES_CATEGORY_ID}"]{
            ...,
            company->{
                ...,
                name
            },
            wineOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    return (
        <>
            <CatalogHeader heading="Wines" />
            <ProductGrid products={wines} />
        </>
    );
}
