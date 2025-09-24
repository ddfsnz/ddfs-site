import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { PORTS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Port } from "@/types/product";

export default async function Page() {
    const ports = await sanity.fetch<Port[]>(
        `*[_type == "product" && category._ref == "${PORTS_CATEGORY_ID}"]{
            ...,
            company->{
                ...,
                name
            },
            portOptions {
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
            <CatalogHeader heading="Ports" />
            <ProductGrid products={ports} />
        </>
    );
}
