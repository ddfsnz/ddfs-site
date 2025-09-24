import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { sanity, SPIRITS_CATEGORY_ID } from "@/lib/sanity";
import { Spirit } from "@/types/product";

export default async function Page() {
    const spirits = await sanity.fetch<Spirit[]>(
        `*[_type == "product" && category._ref == "${SPIRITS_CATEGORY_ID}"]{
            ...,
            company->{
                ...,
                name
            },
            spiritOptions {
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
            <CatalogHeader heading="Spirits" />
            <ProductGrid products={spirits} />
        </>
    );
}
